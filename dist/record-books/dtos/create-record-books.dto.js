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
exports.CreateRecordBookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateRecordBookDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'name' }),
    __metadata("design:type", String)
], CreateRecordBookDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'material' }),
    __metadata("design:type", Object)
], CreateRecordBookDto.prototype, "material", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, swagger_1.ApiProperty)({ type: Date, description: 'time' }),
    __metadata("design:type", Date)
], CreateRecordBookDto.prototype, "time", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ type: String, description: 'userId' }),
    __metadata("design:type", String)
], CreateRecordBookDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: 'numberOfLeafTotal', type: Number }),
    __metadata("design:type", Number)
], CreateRecordBookDto.prototype, "numberOfLeafTotal", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: 'LeafDone', type: Array }),
    __metadata("design:type", Array)
], CreateRecordBookDto.prototype, "LeafDone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'array', description: 'children' }),
    __metadata("design:type", Object)
], CreateRecordBookDto.prototype, "children", void 0);
exports.CreateRecordBookDto = CreateRecordBookDto;
//# sourceMappingURL=create-record-books.dto.js.map