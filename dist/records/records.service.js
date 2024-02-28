"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordsService = void 0;
const assignments_service_1 = require("./../assignment/assignments.service");
const record_books_service_1 = require("./../record-books/record-books.service");
const records_schema_1 = require("./schemas/records.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
let RecordsService = class RecordsService {
    constructor(recordModel, recordBookService, assignmentService, usersService) {
        this.recordModel = recordModel;
        this.recordBookService = recordBookService;
        this.assignmentService = assignmentService;
        this.usersService = usersService;
    }
    async getPagingRecords(filter) {
        if (filter.pageSize === 0)
            filter.pageSize = 1;
        const skip = filter.pageSize * filter.current - filter.pageSize;
        const limit = filter.pageSize;
        if (filter.name)
            filter.name = new RegExp(filter.name, 'i');
        const data = await this.recordModel
            .find(filter)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate('parent')
            .populate('root')
            .exec();
        const total = await this.recordModel.countDocuments(filter);
        return { data, total };
    }
    async getPagingHighestRecords(filter) {
        if (filter.pageSize === 0)
            filter.pageSize = 1;
        const skip = filter.pageSize * filter.current - filter.pageSize;
        const limit = filter.pageSize;
        if (filter.name)
            filter.name = new RegExp(filter.name, 'i');
        let data = await this.recordModel
            .find(filter)
            .sort({ _id: -1 })
            .populate('parent')
            .populate('root')
            .exec();
        for (let i = 0; i < data.length; i++) {
            for (let j = i + 1; j < data.length; j++) {
                if (data[i].parent === data[j].parent) {
                    if (data[i].numberCorrect < data[j].numberCorrect) {
                        data.splice(i, 1);
                        i--;
                        break;
                    }
                    else {
                        data.splice(j, 1);
                        j--;
                    }
                }
            }
        }
        for (let i = 0; i < data.length; i++) {
            for (let j = i + 1; j < data.length; j++) {
                if (data[i].parent == data[j].parent) {
                    const date1 = new Date(data[i].time);
                    const date2 = new Date(data[j].time);
                    if (date1 < date2) {
                        data.splice(i, 1);
                        i--;
                        break;
                    }
                    else {
                        data.splice(j, 1);
                        j--;
                    }
                }
            }
        }
        const total = data.length;
        data = data.slice(skip, skip + limit);
        return { data, total };
    }
    async getAllRecord() {
        return await this.recordModel.find().exec();
    }
    async getRecordsByUserId(userId) {
        try {
            const records = await this.recordModel
                .find({ userId })
                .populate('parent')
                .populate('root')
                .exec();
            return records;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async createRecord(materialService, exercise) {
        const record = new this.recordModel(exercise);
        await record.save();
        this.recordBookService.checkUpdateRecordBookFromRecord(materialService, record, exercise.userId);
        this.assignmentService.checkUpdateHighestRecord(record, exercise.userId);
        return record;
    }
    async getRecordsOfBook(bookId, userId) {
        const recordBook = await this.recordBookService.getOneRecordBook(bookId, userId);
        if (recordBook) {
            const idsObj = recordBook.children;
            const ids = [];
            for (const key in idsObj) {
                ids.push(idsObj[key].toString());
            }
            console.log('ids:', ids);
            const records = await this.recordModel.find({ _id: { $in: ids } });
            return records;
        }
        else
            return [];
    }
    async getRecordById(id) {
        return await this.recordModel.findById(id).exec();
    }
    async getDoTimes(id, userId) {
        console.log('id:', id);
        console.log('user   id:', userId);
        const record = await this.recordModel.findOne({ parent: id, userId: userId });
        if (record) {
            const records = await this.recordModel.find({
                parent: id,
                userId: userId
            }).exec();
            return {
                data: records.length,
                userId: userId,
                material: record.parent,
                id: id,
            };
        }
        else
            return { data: 0 };
    }
    async checkRecord(materialId, email) {
        try {
            const user = await this.usersService.getUserByEmail(email);
            const userId = user._id;
            const records = await this.recordModel
                .find({ parent: materialId, userId })
                .exec();
            if (records && records.length > 0) {
                let highestRecord = records[0];
                for (let i = 1; i < records.length; i++) {
                    if (records[i].numberCorrect > highestRecord.numberCorrect) {
                        highestRecord = records[i];
                    }
                    else if (records[i].numberCorrect === highestRecord.numberCorrect) {
                        const date1 = new Date(records[i].time);
                        const date2 = new Date(highestRecord.time);
                        if (date1 > date2) {
                            highestRecord = records[i];
                        }
                    }
                }
                return {
                    achivedPoint: highestRecord.numberCorrect,
                    total: highestRecord.totalQuestion,
                    status: true
                };
            }
            else
                return {
                    status: false
                };
        }
        catch (error) {
            console.log(error);
            return {
                status: false
            };
        }
    }
};
RecordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(records_schema_1.Record.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        record_books_service_1.RecordBooksService,
        assignments_service_1.AssignmentsService,
        users_service_1.UsersService])
], RecordsService);
exports.RecordsService = RecordsService;
//# sourceMappingURL=records.service.js.map