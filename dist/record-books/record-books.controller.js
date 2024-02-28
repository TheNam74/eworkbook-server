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
exports.RecordBooksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const record_books_service_1 = require("./record-books.service");
let RecordBooksController = class RecordBooksController {
    constructor(recordBooksService) {
        this.recordBooksService = recordBooksService;
    }
    async getAllRecordBooks() {
        return await this.recordBooksService.getAllRecordBook();
    }
    async getRecordBooksByUserId(id) {
        return await this.recordBooksService.getRecordBooksByUserId(id);
    }
    getPagingMaterials(filter) {
        return this.recordBooksService.getPagingMaterials(filter);
    }
    async alsoLearn(id, userId) {
        return await this.recordBooksService.getUsersLearningThisBook(id, userId);
    }
    async getMaterialRootLearningSudent(id) {
        const students = await this.recordBooksService.getTotalStudents(id);
        return students;
    }
    async getRecordBook(userId, bookId) {
        return await this.recordBooksService.getRecordBook(userId, bookId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecordBooksController.prototype, "getAllRecordBooks", null);
__decorate([
    (0, common_1.Get)('/user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordBooksController.prototype, "getRecordBooksByUserId", null);
__decorate([
    (0, common_1.Get)('/paging'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecordBooksController.prototype, "getPagingMaterials", null);
__decorate([
    (0, common_1.Get)('/alsoLearn/:id/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecordBooksController.prototype, "alsoLearn", null);
__decorate([
    (0, common_1.Get)('/learningStudent/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordBooksController.prototype, "getMaterialRootLearningSudent", null);
__decorate([
    (0, common_1.Get)('/:userId/:bookId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('bookId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecordBooksController.prototype, "getRecordBook", null);
RecordBooksController = __decorate([
    (0, common_1.Controller)('recordBooks'),
    (0, swagger_1.ApiTags)('recordBooks'),
    __metadata("design:paramtypes", [record_books_service_1.RecordBooksService])
], RecordBooksController);
exports.RecordBooksController = RecordBooksController;
//# sourceMappingURL=record-books.controller.js.map