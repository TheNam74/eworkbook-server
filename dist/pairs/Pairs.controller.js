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
exports.PairsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const Pairs_service_1 = require("./Pairs.service");
let PairsController = class PairsController {
    constructor(PairsService) {
        this.PairsService = PairsService;
    }
    async getAllPairs() {
        return await this.PairsService.getAllPair();
    }
    async getPairsByUserId(id) {
        return await this.PairsService.getPairsByUserId(id);
    }
    getPagingPairs(filter) {
        return this.PairsService.getPagingPairs(filter);
    }
    async getPairById(id) {
        return await this.PairsService.getPairById(id);
    }
    async createPair(teacherId, studentId) {
        const pairDto = {
            teacher: teacherId,
            student: studentId,
        };
        return await this.PairsService.createPair(pairDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PairsController.prototype, "getAllPairs", null);
__decorate([
    (0, common_1.Get)('/teacher/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PairsController.prototype, "getPairsByUserId", null);
__decorate([
    (0, common_1.Get)('/paging'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PairsController.prototype, "getPagingPairs", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PairsController.prototype, "getPairById", null);
__decorate([
    (0, common_1.Get)('/:teacherId/:studentId'),
    __param(0, (0, common_1.Param)('teacherId')),
    __param(1, (0, common_1.Param)('studentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PairsController.prototype, "createPair", null);
PairsController = __decorate([
    (0, common_1.Controller)('Pairs'),
    (0, swagger_1.ApiTags)('Pairs'),
    __metadata("design:paramtypes", [Pairs_service_1.PairsService])
], PairsController);
exports.PairsController = PairsController;
//# sourceMappingURL=Pairs.controller.js.map