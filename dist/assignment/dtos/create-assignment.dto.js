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
exports.CreateAssignmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateAssignmentDto {
}
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, swagger_1.ApiProperty)({ type: Date, description: 'deadline' }),
    __metadata("design:type", Date)
], CreateAssignmentDto.prototype, "deadline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'student' }),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "student", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'teacher' }),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "teacher", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'material' }),
    __metadata("design:type", Object)
], CreateAssignmentDto.prototype, "material", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'status' }),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'redoTimes' }),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "redoTimes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'canReview' }),
    __metadata("design:type", Boolean)
], CreateAssignmentDto.prototype, "canReview", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'publicScore' }),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "publicScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'limitTime' }),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "limitTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'isLimitTime' }),
    __metadata("design:type", Boolean)
], CreateAssignmentDto.prototype, "isLimitTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'record' }),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "record", void 0);
exports.CreateAssignmentDto = CreateAssignmentDto;
//# sourceMappingURL=create-assignment.dto.js.map