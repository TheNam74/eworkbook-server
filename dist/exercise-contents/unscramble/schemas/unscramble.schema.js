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
exports.UnscrambleSchema = exports.Unscramble = void 0;
const mongoose_1 = require("@nestjs/mongoose");
class UnscrambleDetail {
}
let Unscramble = class Unscramble {
};
__decorate([
    (0, mongoose_1.Prop)({ type: UnscrambleDetail, required: true }),
    __metadata("design:type", UnscrambleDetail)
], Unscramble.prototype, "detail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], Unscramble.prototype, "correctAnswer", void 0);
Unscramble = __decorate([
    (0, mongoose_1.Schema)()
], Unscramble);
exports.Unscramble = Unscramble;
exports.UnscrambleSchema = mongoose_1.SchemaFactory.createForClass(Unscramble);
//# sourceMappingURL=unscramble.schema.js.map