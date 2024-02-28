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
class SortDetailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'mainContent' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SortDetailDto.prototype, "mainContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [
            {
                questionIndex: Number,
                questionElements: [
                    {
                        elementImg: String,
                        elementId: Number,
                    },
                ],
            },
        ],
        description: 'questions',
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SortDetailDto.prototype, "questions", void 0);
class CreateSortDto {
}
__decorate([
    (0, class_transformer_1.Type)(() => SortDetailDto),
    __metadata("design:type", SortDetailDto)
], CreateSortDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [Number],
        description: 'correctAnswer',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Array)
], CreateSortDto.prototype, "correctAnswer", void 0);
exports.default = CreateSortDto;
//# sourceMappingURL=create-sort.dto.js.map