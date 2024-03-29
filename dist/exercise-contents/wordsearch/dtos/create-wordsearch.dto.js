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
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class WordsearchDetailDto {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Array),
    (0, swagger_1.ApiProperty)({ type: Array, description: 'grid' }),
    __metadata("design:type", Array)
], WordsearchDetailDto.prototype, "grid", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => String),
    (0, swagger_1.ApiProperty)({ type: Array, description: 'words' }),
    __metadata("design:type", Array)
], WordsearchDetailDto.prototype, "words", void 0);
class WordsearchElementDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'word' }),
    __metadata("design:type", String)
], WordsearchElementDto.prototype, "word", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Object, description: 'start' }),
    __metadata("design:type", Object)
], WordsearchElementDto.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Object, description: 'end' }),
    __metadata("design:type", Object)
], WordsearchElementDto.prototype, "end", void 0);
class CreateWordsearchDto {
}
__decorate([
    (0, class_transformer_1.Type)(() => WordsearchDetailDto),
    __metadata("design:type", WordsearchDetailDto)
], CreateWordsearchDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Array, description: 'correctAnswer' }),
    __metadata("design:type", Array)
], CreateWordsearchDto.prototype, "correctAnswer", void 0);
exports.default = CreateWordsearchDto;
//# sourceMappingURL=create-wordsearch.dto.js.map