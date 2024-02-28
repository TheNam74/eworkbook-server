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
exports.AssignmentSchema = exports.Assignment = void 0;
const material_schema_1 = require("../../materials/schemas/material.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("../../users/schemas/users.schema");
const records_schema_1 = require("../../records/schemas/records.schema");
let Assignment = class Assignment {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Assignment.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", Date)
], Assignment.prototype, "deadline", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", users_schema_1.User)
], Assignment.prototype, "student", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", users_schema_1.User)
], Assignment.prototype, "teacher", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Material',
    }),
    __metadata("design:type", material_schema_1.Material)
], Assignment.prototype, "material", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: 'doing',
    }),
    __metadata("design:type", String)
], Assignment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: 999999,
    }),
    __metadata("design:type", Number)
], Assignment.prototype, "redoTimes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true,
    }),
    __metadata("design:type", Boolean)
], Assignment.prototype, "canReview", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true,
    }),
    __metadata("design:type", Boolean)
], Assignment.prototype, "publicScore", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Assignment.prototype, "limitTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], Assignment.prototype, "isLimitTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Record',
    }),
    __metadata("design:type", records_schema_1.Record)
], Assignment.prototype, "record", void 0);
Assignment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Assignment);
exports.Assignment = Assignment;
exports.AssignmentSchema = mongoose_1.SchemaFactory.createForClass(Assignment);
//# sourceMappingURL=assignments.schema.js.map