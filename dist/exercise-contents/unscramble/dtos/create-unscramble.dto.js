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
exports.CreateUnscrambleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UnscrambleQuestionDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'questionText' }),
    __metadata("design:type", String)
], UnscrambleQuestionDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'questionText' }),
    __metadata("design:type", String)
], UnscrambleQuestionDto.prototype, "questionText", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'questionImg' }),
    __metadata("design:type", String)
], UnscrambleQuestionDto.prototype, "questionImg", void 0);
class UnscrambleDetailDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'mainText' }),
    __metadata("design:type", String)
], UnscrambleDetailDto.prototype, "mainText", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'mainImg' }),
    __metadata("design:type", String)
], UnscrambleDetailDto.prototype, "mainImg", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UnscrambleQuestionDto),
    __metadata("design:type", Array)
], UnscrambleDetailDto.prototype, "questionArray", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: 'isCharacterScramble' }),
    __metadata("design:type", Boolean)
], UnscrambleDetailDto.prototype, "isCharacterScramble", void 0);
class UnscrambleKeyDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'quesionId' }),
    __metadata("design:type", String)
], UnscrambleKeyDto.prototype, "quesionId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'key' }),
    __metadata("design:type", String)
], UnscrambleKeyDto.prototype, "key", void 0);
class CreateUnscrambleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: UnscrambleDetailDto, description: 'detail' }),
    __metadata("design:type", UnscrambleDetailDto)
], CreateUnscrambleDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [UnscrambleKeyDto], description: 'correctAnswer' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UnscrambleKeyDto),
    __metadata("design:type", Array)
], CreateUnscrambleDto.prototype, "correctAnswer", void 0);
exports.CreateUnscrambleDto = CreateUnscrambleDto;
//# sourceMappingURL=create-unscramble.dto.js.map