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
exports.CreatePicDragAndDropDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PicDragAndDropCoordinateDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'top' }),
    __metadata("design:type", Number)
], PicDragAndDropCoordinateDto.prototype, "top", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'left' }),
    __metadata("design:type", Number)
], PicDragAndDropCoordinateDto.prototype, "left", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'id' }),
    __metadata("design:type", Number)
], PicDragAndDropCoordinateDto.prototype, "id", void 0);
class PicDragAndDropGivenWordDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'id' }),
    __metadata("design:type", Number)
], PicDragAndDropGivenWordDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'word' }),
    __metadata("design:type", String)
], PicDragAndDropGivenWordDto.prototype, "word", void 0);
class PicDragAndDropDetailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PicDragAndDropGivenWordDto],
        description: 'givenWords',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PicDragAndDropGivenWordDto),
    __metadata("design:type", Array)
], PicDragAndDropDetailDto.prototype, "givenWords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PicDragAndDropCoordinateDto],
        description: 'coordinates',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PicDragAndDropCoordinateDto),
    __metadata("design:type", Array)
], PicDragAndDropDetailDto.prototype, "coordinates", void 0);
class PicDragAndDropKeyDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'coordinateId' }),
    __metadata("design:type", Number)
], PicDragAndDropKeyDto.prototype, "coordinateId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'key' }),
    __metadata("design:type", String)
], PicDragAndDropKeyDto.prototype, "key", void 0);
class CreatePicDragAndDropDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: PicDragAndDropDetailDto, description: 'detail' }),
    __metadata("design:type", PicDragAndDropDetailDto)
], CreatePicDragAndDropDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PicDragAndDropKeyDto], description: 'correctAnswer' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PicDragAndDropKeyDto),
    __metadata("design:type", Array)
], CreatePicDragAndDropDto.prototype, "correctAnswer", void 0);
exports.CreatePicDragAndDropDto = CreatePicDragAndDropDto;
//# sourceMappingURL=create-pic-drag-and-drop.dto.js.map