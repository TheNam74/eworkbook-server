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
exports.CreateMultipleChoiceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class TextAndImageDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'text' }),
    __metadata("design:type", String)
], TextAndImageDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'img' }),
    __metadata("design:type", String)
], TextAndImageDto.prototype, "img", void 0);
class QuestionMultipleChoiceDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuestionMultipleChoiceDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'text' }),
    __metadata("design:type", String)
], QuestionMultipleChoiceDto.prototype, "questionText", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'img' }),
    __metadata("design:type", String)
], QuestionMultipleChoiceDto.prototype, "questionImg", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TextAndImageDto),
    __metadata("design:type", Array)
], QuestionMultipleChoiceDto.prototype, "answers", void 0);
class CreateMultipleChoiceDto {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QuestionMultipleChoiceDto),
    __metadata("design:type", Array)
], CreateMultipleChoiceDto.prototype, "detail", void 0);
exports.CreateMultipleChoiceDto = CreateMultipleChoiceDto;
//# sourceMappingURL=create-multiple-choice.dto.js.map