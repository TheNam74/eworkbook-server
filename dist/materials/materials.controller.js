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
exports.MaterialsController = void 0;
const create_material_dto_1 = require("./dtos/create-material.dto");
const common_1 = require("@nestjs/common");
const materials_service_1 = require("./materials.service");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const decorators_1 = require("@nestjs/common/decorators");
const guards_1 = require("../common/guards");
const decorators_2 = require("../common/decorators");
const get_next_material_dto_1 = require("./dtos/get-next-material.dto");
let MaterialsController = class MaterialsController {
    constructor(materialsService) {
        this.materialsService = materialsService;
    }
    getMaterials(filter) {
        return this.materialsService.getMaterials(filter);
    }
    getDemoMaterialId() {
        return this.materialsService.getDemoMaterialId();
    }
    getPagingMaterials(filter) {
        return this.materialsService.getPagingMaterials(filter);
    }
    getPagingMaterialsWithExs(filter) {
        return this.materialsService.getPagingMaterialsWithExercises(filter);
    }
    getFieldValues() {
        return this.materialsService.getFieldValues();
    }
    getHighlyRatedMaterials() {
        return this.materialsService.getHighlyRatedMaterials();
    }
    getTopStudentsMaterials() {
        return this.materialsService.getTopStudentsMaterials();
    }
    getMaterial(id) {
        return this.materialsService.getMaterialById(id);
    }
    getMaterialRoot(id) {
        return this.materialsService.getMaterial(id);
    }
    updateMaterial(id, createMaterialDto) {
        return this.materialsService.updateMaterial(id, createMaterialDto);
    }
    deleteMaterial(id) {
        return this.materialsService.deleteMaterial(id);
    }
    createMaterial(createMaterialDto) {
        return this.materialsService.createMaterial(createMaterialDto);
    }
    handleUpload(file) {
        return { url: file.filename };
    }
    getImage(filename, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), `uploads/images/materials/${filename}`)));
    }
    getParentMaterial(id) {
        return this.materialsService.getRootOfThisMaterial(id);
    }
    setAuthor(materialId, authorId) {
        return this.materialsService.setAuthor(materialId, authorId);
    }
    getNextMaterial(infor) {
        return this.materialsService.getNextMaterial(infor);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getMaterials", null);
__decorate([
    (0, decorators_2.Public)(),
    (0, common_1.Get)('/demoId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getDemoMaterialId", null);
__decorate([
    (0, common_1.Get)('/paging'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getPagingMaterials", null);
__decorate([
    (0, common_1.Get)('/pagingwithexs'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getPagingMaterialsWithExs", null);
__decorate([
    (0, common_1.Get)('/fields'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MaterialsController.prototype, "getFieldValues", null);
__decorate([
    (0, common_1.Get)('highlyRated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getHighlyRatedMaterials", null);
__decorate([
    (0, common_1.Get)('topStudents'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getTopStudentsMaterials", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getMaterial", null);
__decorate([
    (0, common_1.Get)('/root/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getMaterialRoot", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    (0, swagger_1.ApiBody)({ type: create_material_dto_1.CreateMaterialDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_material_dto_1.CreateMaterialDto]),
    __metadata("design:returntype", void 0)
], MaterialsController.prototype, "updateMaterial", null);
__decorate([
    (0, decorators_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MaterialsController.prototype, "deleteMaterial", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_material_dto_1.CreateMaterialDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_material_dto_1.CreateMaterialDto]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "createMaterial", null);
__decorate([
    (0, decorators_2.Public)(),
    (0, common_1.Post)('images'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/images/materials',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `${uniqueSuffix}${ext}`;
                callback(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaterialsController.prototype, "handleUpload", null);
__decorate([
    (0, decorators_2.Public)(),
    (0, common_1.Get)('images/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MaterialsController.prototype, "getImage", null);
__decorate([
    (0, decorators_2.Public)(),
    (0, common_1.Get)('parentMaterial/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getParentMaterial", null);
__decorate([
    (0, decorators_2.Public)(),
    (0, common_1.Get)('setAuthor/:materialId/:authorId'),
    __param(0, (0, common_1.Param)('materialId')),
    __param(1, (0, common_1.Param)('authorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "setAuthor", null);
__decorate([
    (0, decorators_2.Public)(),
    (0, common_1.Post)('getNextMaterial'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_next_material_dto_1.GetNextMaterialDto]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getNextMaterial", null);
MaterialsController = __decorate([
    (0, common_1.Controller)('materials'),
    (0, swagger_1.ApiTags)('Material'),
    (0, decorators_1.UseGuards)(guards_1.AtGuard),
    __metadata("design:paramtypes", [materials_service_1.MaterialsService])
], MaterialsController);
exports.MaterialsController = MaterialsController;
//# sourceMappingURL=materials.controller.js.map