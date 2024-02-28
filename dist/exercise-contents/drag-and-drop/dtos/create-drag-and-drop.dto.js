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
exports.CreateDragAndDropDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class DragAndDropQuestionDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'contextId' }),
    __metadata("design:type", String)
], DragAndDropQuestionDto.prototype, "contextId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'context' }),
    __metadata("design:type", String)
], DragAndDropQuestionDto.prototype, "context", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'contextImg' }),
    __metadata("design:type", String)
], DragAndDropQuestionDto.prototype, "contextImg", void 0);
class DragAndDropGivenWordDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'id' }),
    __metadata("design:type", String)
], DragAndDropGivenWordDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'word' }),
    __metadata("design:type", String)
], DragAndDropGivenWordDto.prototype, "word", void 0);
class DragAndDropDetailDto {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], DragAndDropDetailDto.prototype, "givenWords", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DragAndDropQuestionDto),
    __metadata("design:type", Array)
], DragAndDropDetailDto.prototype, "contextArray", void 0);
class DragAndDropKeyDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'contextId' }),
    __metadata("design:type", String)
], DragAndDropKeyDto.prototype, "contextId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'key' }),
    __metadata("design:type", String)
], DragAndDropKeyDto.prototype, "key", void 0);
class CreateDragAndDropDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: DragAndDropDetailDto, description: 'detail' }),
    __metadata("design:type", DragAndDropDetailDto)
], CreateDragAndDropDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [DragAndDropKeyDto], description: 'correctAnswer' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DragAndDropKeyDto),
    __metadata("design:type", Array)
], CreateDragAndDropDto.prototype, "correctAnswer", void 0);
exports.CreateDragAndDropDto = CreateDragAndDropDto;
//# sourceMappingURL=create-drag-and-drop.dto.js.map