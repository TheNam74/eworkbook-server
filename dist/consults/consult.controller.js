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
exports.ConsultController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const consult_service_1 = require("./consult.service");
const create_consult_dto_1 = require("./dtos/create-consult.dto");
let ConsultController = class ConsultController {
    constructor(consultService) {
        this.consultService = consultService;
    }
    async create(createConsultDto) {
        return this.consultService.create(createConsultDto);
    }
    async findAll() {
        return this.consultService.findAll();
    }
    async findOne(id) {
        return this.consultService.findOne(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_consult_dto_1.default]),
    __metadata("design:returntype", Promise)
], ConsultController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConsultController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConsultController.prototype, "findOne", null);
ConsultController = __decorate([
    (0, common_1.Controller)('Consults'),
    (0, swagger_1.ApiTags)('Consults'),
    __metadata("design:paramtypes", [consult_service_1.default])
], ConsultController);
exports.ConsultController = ConsultController;
//# sourceMappingURL=consult.controller.js.map