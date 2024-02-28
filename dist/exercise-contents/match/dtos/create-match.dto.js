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
exports.CreateMatchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class MatchColDataDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'id' }),
    __metadata("design:type", String)
], MatchColDataDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'element' }),
    __metadata("design:type", String)
], MatchColDataDto.prototype, "element", void 0);
class MatchDataDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'colKey' }),
    __metadata("design:type", Number)
], MatchDataDto.prototype, "colKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MatchColDataDto], description: 'colData' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => MatchColDataDto),
    __metadata("design:type", Array)
], MatchDataDto.prototype, "colData", void 0);
class MatchDetailDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ type: Number, description: 'totalCol' }),
    __metadata("design:type", Number)
], MatchDetailDto.prototype, "totalCol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MatchDataDto], description: 'data' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MatchDataDto),
    __metadata("design:type", MatchDataDto)
], MatchDetailDto.prototype, "data", void 0);
class MatchPairDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'first' }),
    __metadata("design:type", String)
], MatchPairDto.prototype, "first", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'second' }),
    __metadata("design:type", String)
], MatchPairDto.prototype, "second", void 0);
class CreateMatchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: MatchDetailDto, description: 'detail' }),
    __metadata("design:type", MatchDetailDto)
], CreateMatchDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [MatchPairDto], description: 'correctAnswer' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MatchPairDto),
    __metadata("design:type", Array)
], CreateMatchDto.prototype, "correctAnswer", void 0);
exports.CreateMatchDto = CreateMatchDto;
//# sourceMappingURL=create-match.dto.js.map