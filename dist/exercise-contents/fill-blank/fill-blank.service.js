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
exports.FillBlankService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fill_blank_schema_1 = require("./schemas/fill-blank.schema");
let FillBlankService = class FillBlankService {
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
        var _a, _b, _c, _d, _e, _f, _g, _h;
        try {
            const status = [];
            const lowercaseFirstLetter = (string) => string ? string.charAt(0).toLowerCase() + string.slice(1) : '';
            const answerCompare = (answer, userAnswer) => lowercaseFirstLetter(answer) === lowercaseFirstLetter(userAnswer);
            const exercise = await this.getContent(assignment.content._id);
            for (let i = 0; i < ((_a = exercise.correctAnswer) === null || _a === void 0 ? void 0 : _a.length); i++) {
                status.push({
                    correct: answerCompare(((_d = (_c = (_b = assignment.content) === null || _b === void 0 ? void 0 : _b.detail) === null || _c === void 0 ? void 0 : _c.questionArray[i].answer) === null || _d === void 0 ? void 0 : _d.trim()) || '', ((_e = exercise.correctAnswer[i].key) === null || _e === void 0 ? void 0 : _e.trim()) || ''),
                    correctAnswer: exercise.correctAnswer[i].key,
                    answer: ((_h = (_g = (_f = assignment.content) === null || _f === void 0 ? void 0 : _f.detail) === null || _g === void 0 ? void 0 : _g.questionArray[i].answer) === null || _h === void 0 ? void 0 : _h.trim()) || '',
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
FillBlankService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(fill_blank_schema_1.FillBlank.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FillBlankService);
exports.FillBlankService = FillBlankService;
//# sourceMappingURL=fill-blank.service.js.map