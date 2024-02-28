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
exports.RecordBookSchema = exports.RecordBook = void 0;
const material_schema_1 = require("../../materials/schemas/material.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("../../users/schemas/users.schema");
let RecordBook = class RecordBook {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], RecordBook.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Material',
    }),
    __metadata("design:type", material_schema_1.Material)
], RecordBook.prototype, "material", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", Date)
], RecordBook.prototype, "time", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", users_schema_1.User)
], RecordBook.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
    }),
    __metadata("design:type", Number)
], RecordBook.prototype, "numberOfLeafTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Array,
        required: true,
    }),
    __metadata("design:type", Array)
], RecordBook.prototype, "LeafDone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Array,
    }),
    __metadata("design:type", Array)
], RecordBook.prototype, "children", void 0);
RecordBook = __decorate([
    (0, mongoose_1.Schema)()
], RecordBook);
exports.RecordBook = RecordBook;
exports.RecordBookSchema = mongoose_1.SchemaFactory.createForClass(RecordBook);
//# sourceMappingURL=record-books.schema.js.map