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
exports.CreateLineWordSearchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class LineWordSearchDetailDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'questionId' }),
    __metadata("design:type", String)
], LineWordSearchDetailDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'findWord' }),
    __metadata("design:type", String)
], LineWordSearchDetailDto.prototype, "findWord", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'content' }),
    __metadata("design:type", String)
], LineWordSearchDetailDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'image' }),
    __metadata("design:type", String)
], LineWordSearchDetailDto.prototype, "image", void 0);
class LineWordSearchCorrectAnswerDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'questionId' }),
    __metadata("design:type", String)
], LineWordSearchCorrectAnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'position' }),
    __metadata("design:type", Number)
], LineWordSearchCorrectAnswerDto.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'length' }),
    __metadata("design:type", Number)
], LineWordSearchCorrectAnswerDto.prototype, "length", void 0);
class CreateLineWordSearchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [LineWordSearchDetailDto], description: 'detail' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => LineWordSearchDetailDto),
    __metadata("design:type", Array)
], CreateLineWordSearchDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [LineWordSearchCorrectAnswerDto], description: 'correctAnswer' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => LineWordSearchCorrectAnswerDto),
    __metadata("design:type", Array)
], CreateLineWordSearchDto.prototype, "correctAnswer", void 0);
exports.CreateLineWordSearchDto = CreateLineWordSearchDto;
//# sourceMappingURL=create-line-word-search.dto.js.map