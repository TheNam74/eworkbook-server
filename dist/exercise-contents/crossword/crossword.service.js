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
exports.CrosswordService = void 0;
const crossword_schema_1 = require("./schema/crossword.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CrosswordService = class CrosswordService {
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
            const exercise = await this.getContent(assignment.content._id);
            const getValid = (arr, row, col) => {
                if (arr[row]) {
                    if (arr[row][col]) {
                        return arr[row][col];
                    }
                    return '-';
                }
                return '-';
            };
            const getWord = (row, col, word, orientation) => {
                let result = '';
                for (let i = 0; i < word.length; i++) {
                    if (orientation === 'across') {
                        result += getValid(assignment.content.detail.answer, row, col + i);
                    }
                    else {
                        result += getValid(assignment.content.detail.answer, row + i, col);
                    }
                }
                return result;
            };
            if ((_a = assignment.content.detail) === null || _a === void 0 ? void 0 : _a.answer) {
                for (let i = 0; i < ((_b = exercise.correctAnswer) === null || _b === void 0 ? void 0 : _b.length); i++) {
                    const userInput = getWord(exercise.correctAnswer[i].position[1] - 1, exercise.correctAnswer[i].position[0] - 1, exercise.correctAnswer[i].answer, exercise.correctAnswer[i].orientation);
                    status.push({
                        correct: userInput === ((_c = exercise.correctAnswer[i].answer) === null || _c === void 0 ? void 0 : _c.toUpperCase()),
                        correctAnswer: (_d = exercise.correctAnswer[i].answer) === null || _d === void 0 ? void 0 : _d.toUpperCase(),
                        answer: userInput,
                    });
                }
            }
            else {
                for (let i = 0; i < ((_e = exercise.correctAnswer) === null || _e === void 0 ? void 0 : _e.length); i++) {
                    status.push({
                        correct: false,
                        correctAnswer: (_f = exercise.correctAnswer[i].answer) === null || _f === void 0 ? void 0 : _f.toUpperCase(),
                        answer: '',
                    });
                }
            }
            return {
                exerciseId: assignment._id,
                contentId: exercise._id,
                detail: exercise.correctAnswer,
                status,
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
CrosswordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(crossword_schema_1.Crossword.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CrosswordService);
exports.CrosswordService = CrosswordService;
//# sourceMappingURL=crossword.service.js.map