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
exports.SortService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const sort_schema_1 = require("./schemas/sort.schema");
const _ = require("lodash");
let SortService = class SortService {
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
        try {
            const status = [];
            const content = await this.getContent(assignment.content._id);
            for (const answer of assignment.content.detail) {
                const correctAnswer = content.correctAnswer.find((item) => item.questionIndex == answer.questionIndex).key;
                const userAnswer = answer.userAnswer;
                status.push({
                    correct: _.isEqual(correctAnswer, userAnswer),
                    correctAnswer,
                    userAnswer,
                });
            }
            return {
                exerciseId: assignment._id,
                contentId: content._id,
                detail: content.detail,
                status,
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
SortService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(sort_schema_1.Sort.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SortService);
exports.SortService = SortService;
//# sourceMappingURL=sort.service.js.map