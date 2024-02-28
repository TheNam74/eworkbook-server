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
exports.PairsService = void 0;
const pairs_schema_1 = require("./schemas/pairs.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
let PairsService = class PairsService {
    constructor(PairModel, usersService) {
        this.PairModel = PairModel;
        this.usersService = usersService;
    }
    async getPagingPairs(filter) {
        if (filter.pageSize === 0)
            filter.pageSize = 1;
        const skip = filter.pageSize * filter.current - filter.pageSize;
        const limit = filter.pageSize;
        if (filter.studentemail) {
            const similarEmailStudents = await this.usersService.getSimilarEmail(filter.studentemail);
            const similarEmailStudentIds = similarEmailStudents.map((student) => student._id);
            const data = await this.PairModel
                .find({ student: { $in: similarEmailStudentIds } })
                .populate('teacher')
                .populate('student')
                .skip(skip)
                .limit(limit)
                .exec();
            const total = await this.PairModel
                .find({ student: { $in: similarEmailStudentIds } })
                .populate('teacher')
                .populate('student')
                .countDocuments()
                .exec();
            return { data, total };
        }
        const data = await this.PairModel
            .find(filter)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit)
            .populate('teacher')
            .populate('student')
            .exec();
        const total = await this.PairModel.countDocuments(filter);
        return { data, total };
    }
    async getAllPair() {
        return await this.PairModel.find().exec();
    }
    async getPairsByUserId(userId) {
        try {
            const Pairs = await this.PairModel
                .find({ teacher: userId })
                .populate('teacher')
                .populate('student')
                .exec();
            return Pairs;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async createPair(pairDto) {
        const checkAlreadyExist = await this.PairModel.findOne({ teacher: pairDto.teacher, student: pairDto.student }).populate('teacher').populate('student').exec();
        if (checkAlreadyExist)
            return checkAlreadyExist;
        const Pair = new this.PairModel(pairDto);
        await Pair.save();
        return await this.PairModel.findOne(Pair._id).populate('teacher').populate('student').exec();
    }
    async getPairById(id) {
        return await this.PairModel.findById(id).populate('teacher').populate('student').exec();
    }
};
PairsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(pairs_schema_1.Pair.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], PairsService);
exports.PairsService = PairsService;
//# sourceMappingURL=Pairs.service.js.map