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
exports.CreateListeningDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ListeningQuestionDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'questionId' }),
    __metadata("design:type", String)
], ListeningQuestionDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'questionAudio' }),
    __metadata("design:type", String)
], ListeningQuestionDto.prototype, "questionAudio", void 0);
class ListeningAnswerDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'answerId' }),
    __metadata("design:type", String)
], ListeningAnswerDto.prototype, "answerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'answerImg' }),
    __metadata("design:type", String)
], ListeningAnswerDto.prototype, "answerImg", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'answerText' }),
    __metadata("design:type", String)
], ListeningAnswerDto.prototype, "answerText", void 0);
class ListeningDetailDto {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ListeningDetailDto.prototype, "questionArray", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ListeningQuestionDto),
    __metadata("design:type", Array)
], ListeningDetailDto.prototype, "answerArray", void 0);
class ListeningCorrectAnwserDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'questionId' }),
    __metadata("design:type", String)
], ListeningCorrectAnwserDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'answerId' }),
    __metadata("design:type", String)
], ListeningCorrectAnwserDto.prototype, "answerId", void 0);
class CreateListeningDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: ListeningDetailDto, description: 'detail' }),
    __metadata("design:type", ListeningDetailDto)
], CreateListeningDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ListeningCorrectAnwserDto],
        description: 'correctAnswer',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ListeningCorrectAnwserDto),
    __metadata("design:type", Array)
], CreateListeningDto.prototype, "correctAnswer", void 0);
exports.CreateListeningDto = CreateListeningDto;
//# sourceMappingURL=create-listening.dto.js.map