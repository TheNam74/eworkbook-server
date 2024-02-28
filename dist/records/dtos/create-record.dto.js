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
exports.CreateRecordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateRecordDto {
}
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, swagger_1.ApiProperty)({ type: Date, description: 'time' }),
    __metadata("design:type", Date)
], CreateRecordDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'name' }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'parent' }),
    __metadata("design:type", Object)
], CreateRecordDto.prototype, "parent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'root' }),
    __metadata("design:type", Object)
], CreateRecordDto.prototype, "root", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'userId' }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: 'numberCorrect', type: Number }),
    __metadata("design:type", Number)
], CreateRecordDto.prototype, "numberCorrect", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: 'totalQuestion', type: Number }),
    __metadata("design:type", Number)
], CreateRecordDto.prototype, "totalQuestion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'children' }),
    (0, class_transformer_1.Type)(() => RecordChild),
    __metadata("design:type", Array)
], CreateRecordDto.prototype, "children", void 0);
exports.CreateRecordDto = CreateRecordDto;
class RecordChild {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'userAnswer' }),
    __metadata("design:type", Object)
], RecordChild.prototype, "userAnswer", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'exerciseId' }),
    __metadata("design:type", String)
], RecordChild.prototype, "exerciseId", void 0);
//# sourceMappingURL=create-record.dto.js.map