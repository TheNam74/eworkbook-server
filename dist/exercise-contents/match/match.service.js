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
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const match_schema_1 = require("./schemas/match.schema");
const _ = require("lodash");
let MatchService = class MatchService {
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
                const key = [
                    exercise.correctAnswer[i].first,
                    exercise.correctAnswer[i].second,
                ];
                const userMatch = [];
                if ((_c = (_b = assignment.content) === null || _b === void 0 ? void 0 : _b.detail) === null || _c === void 0 ? void 0 : _c.userChoice) {
                    for (const userLine of (_e = (_d = assignment.content) === null || _d === void 0 ? void 0 : _d.detail) === null || _e === void 0 ? void 0 : _e.userChoice) {
                        if (userLine.first === key[0] ||
                            userLine.second === key[0] ||
                            userLine.first === key[1] ||
                            userLine.second === key[1]) {
                            userMatch.push(userLine.first);
                            userMatch.push(userLine.second);
                        }
                    }
                    status.push({
                        correct: _.isEqual(_.sortBy(key), _.sortBy(userMatch)),
                        correctAnswer: _.sortBy(key),
                        userChoice: _.sortBy(userMatch),
                    });
                }
                else {
                    status.push({
                        correct: false,
                        correctAnswer: key,
                        userChoice: [],
                    });
                }
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
MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(match_schema_1.Match.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MatchService);
exports.MatchService = MatchService;
//# sourceMappingURL=match.service.js.map