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
exports.ExerciseSchema = exports.Exercise = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var ExerciseType;
(function (ExerciseType) {
    ExerciseType["MULTIPLE_CHOICE"] = "MultipleChoice";
    ExerciseType["MATCH"] = "Match";
    ExerciseType["FILL_BLANK"] = "FillBlank";
    ExerciseType["WORDSEARCH"] = "Wordsearch";
    ExerciseType["UNSCRAMBLE"] = "Unscramble";
    ExerciseType["DRAG_AND_DROP"] = "DragAndDrop";
    ExerciseType["PIC_DRAG_AND_DROP"] = "PicDragAndDrop";
    ExerciseType["SORT"] = "Sort";
    ExerciseType["MAKE_SENTENCE"] = "MakeSentence";
    ExerciseType["CROSSWORD"] = "Crossword";
    ExerciseType["LINE_WORD_SEARCH"] = "LineWordSearch";
    ExerciseType["LISTENING"] = "Listening";
})(ExerciseType || (ExerciseType = {}));
let Exercise = class Exercise {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        enum: ExerciseType,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "exerciseType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Material' }),
    __metadata("design:type", String)
], Exercise.prototype, "parentMaterial", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now() }),
    __metadata("design:type", Date)
], Exercise.prototype, "dateAdded", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        required: true,
        refPath: 'exerciseType',
    }),
    __metadata("design:type", String)
], Exercise.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "exerciseAudio", void 0);
Exercise = __decorate([
    (0, mongoose_1.Schema)()
], Exercise);
exports.Exercise = Exercise;
exports.ExerciseSchema = mongoose_1.SchemaFactory.createForClass(Exercise);
//# sourceMappingURL=exercise.schema.js.map