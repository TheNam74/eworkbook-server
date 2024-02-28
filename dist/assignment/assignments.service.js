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
exports.AssignmentsService = void 0;
const assignments_schema_1 = require("./schemas/assignments.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AssignmentsService = class AssignmentsService {
    constructor(assignmentModel) {
        this.assignmentModel = assignmentModel;
    }
    async getPagingAssignments(filter) {
        const skip = filter.pageSize * filter.current - filter.pageSize;
        const limit = filter.pageSize;
        if (filter.name)
            filter.name = new RegExp(filter.name, 'i');
        const data = await this.assignmentModel
            .find(filter)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate('material')
            .populate('student')
            .populate('teacher')
            .populate('record')
            .exec();
        const total = await this.assignmentModel.countDocuments(filter);
        return { data, total };
    }
    async getOneAssignment(filter) {
        if (filter.name)
            filter.name = new RegExp(filter.name, 'i');
        const data = await this.assignmentModel
            .findOne(filter)
            .populate('material')
            .populate('student')
            .populate('teacher')
            .exec();
        return { data };
    }
    async getAllAssignment() {
        return await this.assignmentModel.find().exec();
    }
    async getAssignmentsByUserId(userId) {
        try {
            const assignments = await this.assignmentModel
                .find({ student: userId })
                .populate('material')
                .exec();
            return assignments;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAssignmentsByUserIdByTeacher(userId, teacherId) {
        try {
            const assignments = await this.assignmentModel
                .find({ student: userId, teacher: teacherId })
                .populate('material')
                .exec();
            return assignments;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async createAssignment(ass) {
        const assignment = new this.assignmentModel(ass);
        await assignment.save();
        return assignment;
    }
    async getAssignmentsOfBook(bookId, userId) {
        return await this.assignmentModel.find({ student: userId, material: bookId }).exec();
    }
    async getAssignmentByBookId(bookId) {
        return await this.assignmentModel.find({ material: bookId }).populate('material')
            .populate('student')
            .exec();
    }
    async deleteAssignment(bookid, userid) {
        return await this.assignmentModel.deleteOne({ material: bookid, student: userid }).exec();
    }
    async updateAssignment(id, createAssignmentDto) {
        return await this.assignmentModel.updateOne({ _id: id }, createAssignmentDto).exec();
    }
    async checkUpdateHighestRecord(record, userId) {
        const materialId = record.parent._id;
        const assignment = await this.assignmentModel.findOne({ material: materialId, student: userId }).exec();
        const oldRecord = assignment === null || assignment === void 0 ? void 0 : assignment.record;
        if (oldRecord === undefined || oldRecord === null || oldRecord.numberCorrect < record.numberCorrect) {
            return await this.assignmentModel.updateOne({ material: record.parent._id, student: userId }, { record: record }).exec();
        }
    }
};
AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(assignments_schema_1.Assignment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AssignmentsService);
exports.AssignmentsService = AssignmentsService;
//# sourceMappingURL=assignments.service.js.map