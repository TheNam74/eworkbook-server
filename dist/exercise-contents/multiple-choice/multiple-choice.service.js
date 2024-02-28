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
exports.MultipleChoiceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const _ = require("lodash");
const multiple_choice_schema_1 = require("./schemas/multiple-choice.schema");
let MultipleChoiceService = class MultipleChoiceService {
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
        var _a, _b, _c, _d, _e;
        try {
            const status = [];
            const exercise = await this.getContent(assignment.content._id);
            for (let i = 0; i < ((_a = exercise.correctAnswer) === null || _a === void 0 ? void 0 : _a.length); i++) {
                status.push({
                    correct: _.isEqual(_.sortBy(exercise.correctAnswer[i]), _.sortBy((_c = (_b = assignment.content) === null || _b === void 0 ? void 0 : _b.detail[i]) === null || _c === void 0 ? void 0 : _c.selected) || []),
                    correctAnswer: _.sortBy(exercise.correctAnswer[i]),
                    selected: _.sortBy((_e = (_d = assignment.content) === null || _d === void 0 ? void 0 : _d.detail[i]) === null || _e === void 0 ? void 0 : _e.selected) || [],
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
MultipleChoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(multiple_choice_schema_1.MultipleChoice.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MultipleChoiceService);
exports.MultipleChoiceService = MultipleChoiceService;
//# sourceMappingURL=multiple-choice.service.js.map