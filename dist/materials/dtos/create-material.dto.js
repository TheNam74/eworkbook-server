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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMaterialDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateMaterialDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'name' }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'type' }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'CEFR' }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "CEFR", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'description' }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'coverImg' }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "coverImg", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ type: Boolean, description: 'isLeaf' }),
    __metadata("design:type", Boolean)
], CreateMaterialDto.prototype, "isLeaf", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'depthLevel' }),
    __metadata("design:type", Number)
], CreateMaterialDto.prototype, "depthLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'author' }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "author", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'timeCreate' }),
    __metadata("design:type", Date)
], CreateMaterialDto.prototype, "timeCreate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'status' }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'redoTimes' }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "redoTimes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'canReview' }),
    __metadata("design:type", Boolean)
], CreateMaterialDto.prototype, "canReview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'publicScore' }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "publicScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'limitTime' }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "limitTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'isLimitTime' }),
    __metadata("design:type", Boolean)
], CreateMaterialDto.prototype, "isLimitTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'isPublicForOtherTeacher' }),
    __metadata("design:type", Boolean)
], CreateMaterialDto.prototype, "isPublicForOtherTeacher", void 0);
exports.CreateMaterialDto = CreateMaterialDto;
//# sourceMappingURL=create-material.dto.js.map