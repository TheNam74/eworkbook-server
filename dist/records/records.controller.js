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
exports.RecordsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const records_service_1 = require("./records.service");
let RecordsController = class RecordsController {
    constructor(recordsService) {
        this.recordsService = recordsService;
    }
    async getAllRecords() {
        return await this.recordsService.getAllRecord();
    }
    async getRecordsByUserId(id) {
        return await this.recordsService.getRecordsByUserId(id);
    }
    getPagingRecords(filter) {
        return this.recordsService.getPagingRecords(filter);
    }
    getPagingHighestRecords(filter) {
        return this.recordsService.getPagingHighestRecords(filter);
    }
    async getRecordsOfBook(id, userId) {
        return await this.recordsService.getRecordsOfBook(id, userId);
    }
    async getRecordById(id) {
        return await this.recordsService.getRecordById(id);
    }
    async getDoTimes(userId, id) {
        return await this.recordsService.getDoTimes(id, userId);
    }
    async checkRecord(materialId, email) {
        return await this.recordsService.checkRecord(materialId, email);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "getAllRecords", null);
__decorate([
    (0, common_1.Get)('/user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "getRecordsByUserId", null);
__decorate([
    (0, common_1.Get)('/paging'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "getPagingRecords", null);
__decorate([
    (0, common_1.Get)('/paginghighest'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "getPagingHighestRecords", null);
__decorate([
    (0, common_1.Get)('/book/:id/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "getRecordsOfBook", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "getRecordById", null);
__decorate([
    (0, common_1.Get)('/doTimes/:id/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "getDoTimes", null);
__decorate([
    (0, common_1.Get)('/check/:materialId/:email'),
    __param(0, (0, common_1.Param)('materialId')),
    __param(1, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "checkRecord", null);
RecordsController = __decorate([
    (0, common_1.Controller)('records'),
    (0, swagger_1.ApiTags)('Records'),
    __metadata("design:paramtypes", [records_service_1.RecordsService])
], RecordsController);
exports.RecordsController = RecordsController;
//# sourceMappingURL=records.controller.js.map