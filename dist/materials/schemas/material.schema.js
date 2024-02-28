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
exports.MaterialSchema = exports.Material = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Material = class Material {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'materials',
    }),
    __metadata("design:type", String)
], Material.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Material.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
    }),
    __metadata("design:type", Number)
], Material.prototype, "depthLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Material.prototype, "CEFR", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], Material.prototype, "isLeaf", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Material.prototype, "coverImg", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Material.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Material.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'materials' }),
    __metadata("design:type", String)
], Material.prototype, "parent", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Array,
        required: false,
    }),
    __metadata("design:type", Array)
], Material.prototype, "children", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: false,
    }),
    __metadata("design:type", Number)
], Material.prototype, "totalStudents", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Array,
        required: false,
    }),
    __metadata("design:type", Array)
], Material.prototype, "exercises", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: 0,
    }),
    __metadata("design:type", Number)
], Material.prototype, "ratingCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: 0,
    }),
    __metadata("design:type", Number)
], Material.prototype, "ratingStarAverage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", String)
], Material.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: Date.now(),
    }),
    __metadata("design:type", Date)
], Material.prototype, "timeCreate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: "unlisted",
    }),
    __metadata("design:type", String)
], Material.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        default: 999999,
    }),
    __metadata("design:type", Number)
], Material.prototype, "redoTimes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true,
    }),
    __metadata("design:type", Boolean)
], Material.prototype, "canReview", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: true,
    }),
    __metadata("design:type", Boolean)
], Material.prototype, "publicScore", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Material.prototype, "limitTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], Material.prototype, "isLimitTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], Material.prototype, "isPublicForOtherTeacher", void 0);
Material = __decorate([
    (0, mongoose_1.Schema)()
], Material);
exports.Material = Material;
exports.MaterialSchema = mongoose_1.SchemaFactory.createForClass(Material);
//# sourceMappingURL=material.schema.js.map