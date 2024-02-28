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
exports.RecordBooksService = void 0;
const record_books_schema_1 = require("./schemas/record-books.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RecordBooksService = class RecordBooksService {
    constructor(RecordBookModel) {
        this.RecordBookModel = RecordBookModel;
    }
    async getPagingMaterials(filter) {
        const skip = filter.pageSize * filter.current - filter.pageSize;
        const limit = filter.pageSize;
        if (filter.name)
            filter.name = new RegExp(filter.name, 'i');
        const data = await this.RecordBookModel.find(filter)
            .sort('time')
            .skip(skip)
            .limit(limit)
            .populate('material')
            .populate('userId');
        const total = await this.RecordBookModel.countDocuments(filter);
        return { data, total };
    }
    async getRecordBook(userId, bookId) {
        return await this.RecordBookModel.findOne({ userId, material: bookId });
    }
    async getAllRecordBook() {
        return await this.RecordBookModel.find().populate('userId');
    }
    async getRecordBooksByUserId(userId) {
        try {
            const RecordBooks = await this.RecordBookModel.find({ userId })
                .populate('material')
                .exec();
            return RecordBooks;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async createRecordBook(exercise) {
        const RecordBook = new this.RecordBookModel(exercise);
        await RecordBook.save();
        return RecordBook;
    }
    async checkUpdateRecordBookFromRecord(materialService, record, userId) {
        await record.populate('parent');
        const bookId = record.root._id;
        const recordbook = await this.RecordBookModel.findOne({
            userId: userId,
            material: bookId,
        });
        if (recordbook) {
            if (this.checkArrayContains(recordbook.LeafDone, record.parent._id) ===
                false) {
                const temp = [...recordbook.LeafDone];
                temp.push(record.parent._id);
                recordbook.LeafDone = temp;
            }
            const tempChildren = [...recordbook.children];
            tempChildren.push(record._id);
            recordbook.children = tempChildren;
            recordbook.time = new Date();
            await recordbook.save();
        }
        else {
            const rootWithChilds = await materialService.getMaterial(record.root._id);
            const countLeaf = this.countLeafsOfThis(rootWithChilds);
            const children = [];
            children.push(record._id);
            const leafDones = [];
            leafDones.push(record.parent._id);
            await this.createRecordBook({
                material: bookId,
                LeafDone: leafDones,
                numberOfLeafTotal: countLeaf,
                time: new Date(),
                userId: userId,
                children: children,
                name: rootWithChilds.name,
            });
        }
    }
    async getOneRecordBook(bookId, userId) {
        const recordbook = await this.RecordBookModel.findOne({
            userId: userId,
            material: bookId,
        });
        return recordbook;
    }
    async getUsersLearningThisBook(bookId, userId) {
        const myrecordbook = await this.RecordBookModel.findOne({
            material: bookId,
            userId: userId,
        }).populate('userId');
        let recordBooks = await this.RecordBookModel.find({ material: bookId })
            .populate('userId')
            .limit(4);
        recordBooks = recordBooks.filter(function (value, index, arr) {
            return value._id !== userId;
        });
        const total = await this.RecordBookModel.countDocuments({
            material: bookId,
        });
        return { recordBooks, total };
    }
    countLeafsOfThis(material) {
        let count = 0;
        material.children.forEach((child) => {
            if (child.children.length === 0) {
                count++;
            }
            else {
                count += this.countLeafsOfThis(child);
            }
        });
        return count;
    }
    checkArrayContains(array, value) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].toString() === value.toString()) {
                return true;
            }
        }
        return false;
    }
    async getTopStudentsMaterialId() {
        const result = await this.RecordBookModel.aggregate([
            {
                $group: {
                    _id: '$material',
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
            { $limit: 10 },
        ]);
        return result;
    }
    async getTotalStudents(materialId) {
        const result = await this.RecordBookModel.countDocuments({
            material: materialId,
        });
        return result;
    }
};
RecordBooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(record_books_schema_1.RecordBook.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RecordBooksService);
exports.RecordBooksService = RecordBooksService;
//# sourceMappingURL=record-books.service.js.map