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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicDragAndDropService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const pic_drag_and_drop_schema_1 = require("./schemas/pic-drag-and-drop.schema");
let PicDragAndDropService = class PicDragAndDropService {
    constructor(exerciseModel) {
        this.exerciseModel = exerciseModel;
    }
    async createContent(exercise) {
        return await this.exerciseModel.create(exercise);
    }
    async updateContent(id, content) {
        return await this.exerciseModel.findByIdAndUpdate(id, content);
    }
    async deleteContent(id) {
        return await this.exerciseModel.findByIdAndDelete(id);
    }
    async getContent(id) {
        return await this.exerciseModel.findById(id).exec();
    }
    async getStatus(assignment) {
        var _a, _b, _c, _d, _e, _f;
        try {
            const status = [];
            const answerCompare = (answerContextId, userAnswerContextId) => answerContextId === userAnswerContextId;
            const exercise = await this.getContent(assignment.content._id);
            for (let i = 0; i < ((_a = exercise.correctAnswer) === null || _a === void 0 ? void 0 : _a.length); i++) {
                console.log(exercise.correctAnswer.length);
                const isEqual = answerCompare((_d = (_c = (_b = assignment.content) === null || _b === void 0 ? void 0 : _b.detail) === null || _c === void 0 ? void 0 : _c.coordinates[i].answer) === null || _d === void 0 ? void 0 : _d.id, exercise.correctAnswer[i].coordinateId);
                console.log(isEqual);
                status.push({
                    correct: isEqual,
                    correctAnswer: exercise.correctAnswer[i].key,
                    answer: ((_f = (_e = assignment.content) === null || _e === void 0 ? void 0 : _e.detail) === null || _f === void 0 ? void 0 : _f.coordinates[i].answer) || '',
                });
            }
            return {
                exerciseId: assignment._id,
                contentId: exercise._id,
                detail: exercise.detail,
                status,
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
PicDragAndDropService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(pic_drag_and_drop_schema_1.PicDragAndDrop.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PicDragAndDropService);
exports.PicDragAndDropService = PicDragAndDropService;
//# sourceMappingURL=pic-drag-and-drop.service.js.map