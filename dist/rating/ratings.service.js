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
exports.RatingsService = void 0;
const materials_service_1 = require("../materials/materials.service");
const voting_service_1 = require("./voting/voting.service");
const rating_schema_1 = require("./schema/rating.schema");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RatingsService = class RatingsService {
    constructor(ratingModel, votingService, materialService) {
        this.ratingModel = ratingModel;
        this.votingService = votingService;
        this.materialService = materialService;
    }
    async createRating(rating) {
        const newRating = new this.ratingModel(rating);
        await newRating.save();
        const ratingCount = await this.materialService.getRatingCount(rating.materialId);
        const ratingStarAverage = await this.materialService.getRatingStarAverage(rating.materialId);
        const addedStar = rating.content.star;
        const newRatingStarAverage = (ratingStarAverage * ratingCount + addedStar) / (ratingCount + 1);
        await this.materialService.updateRatingStartAverage(rating.materialId, newRatingStarAverage);
        await this.materialService.increaseRatingCount(rating.materialId);
        return newRating;
    }
    async getRatings(filter) {
        return await this.ratingModel
            .find(filter)
            .populate('userId')
            .populate('materialId');
    }
    async getRatingByMaterialIDAndPaging(filter) {
        const skip = filter.pageSize * filter.page - filter.pageSize;
        const limit = filter.pageSize;
        if (!('content.star' in filter)) {
            return await this.ratingModel
                .find({ materialId: filter.materialId })
                .sort({ createdDate: -1 })
                .populate('userId')
                .populate('materialId')
                .skip(skip)
                .limit(limit);
        }
        let changeToInt;
        if (Array.isArray(filter['content.star'])) {
            changeToInt = filter['content.star'].map((item) => Number(item));
        }
        else {
            changeToInt = Number(filter['content.star']);
        }
        return await this.ratingModel
            .find({ materialId: filter.materialId, 'content.star': changeToInt })
            .sort({ createdDate: -1 })
            .populate('userId')
            .populate('materialId')
            .skip(skip)
            .limit(limit);
    }
    async getSingleRating(filter) {
        return await this.ratingModel
            .findOne(filter)
            .populate('userId')
            .populate('materialId');
    }
    async createVoting(voting) {
        const lastestVoting = await this.votingService.getSingleVoting({
            userId: voting.userId,
            ratingId: voting.ratingId,
        });
        if (lastestVoting == null) {
            if (voting.type == 'Like')
                this.upVote(voting.ratingId);
            else
                this.downVote(voting.ratingId);
        }
        else {
            if (lastestVoting.type === voting.type) {
                return null;
            }
            if (lastestVoting.type === 'Like') {
                this.deleteUpVote(lastestVoting);
                this.downVote(voting.ratingId);
            }
            else {
                this.deleteDownVote(lastestVoting);
                this.upVote(voting.ratingId);
            }
        }
        return this.votingService.createVoting(voting);
    }
    async upVote(ratingId) {
        const upVoteRating = await this.ratingModel.findOneAndUpdate({ _id: ratingId }, { $inc: { upVote: 1 } });
        return upVoteRating;
    }
    async downVote(ratingId) {
        const downVoteRating = await this.ratingModel.findOneAndUpdate({ _id: ratingId }, { $inc: { downVote: 1 } });
        return downVoteRating;
    }
    async deleteUpVote(deletedVote) {
        const upVoteRating = await this.ratingModel.findOneAndUpdate({ _id: deletedVote.ratingId }, { $inc: { upVote: -1 } });
        await this.votingService.deleteVotingById(deletedVote._id);
        return upVoteRating;
    }
    async deleteDownVote(deletedVote) {
        const downVoteRating = await this.ratingModel.findOneAndUpdate({ _id: deletedVote.ratingId }, { $inc: { downVote: -1 } });
        await this.votingService.deleteVotingById(deletedVote.id);
        return downVoteRating;
    }
    async getStarRatio(filter) {
        if (filter.materialId === 'undefined')
            return 0;
        const allRating = await this.ratingModel
            .find({ materialId: filter.materialId })
            .count();
        if (allRating === 0)
            return 0;
        const starAsNumber = parseInt(filter.starValue);
        const starValueNumber = await this.ratingModel
            .find({ materialId: filter.materialId, 'content.star': starAsNumber })
            .count();
        return (starValueNumber * 100) / allRating;
    }
    async updateRating(newRatingData) {
        const oldRating = await this.ratingModel.findOneAndUpdate({ _id: newRatingData._id }, { content: newRatingData.content });
        if (oldRating.content.star !== newRatingData.content.star) {
            const ratingCount = await this.materialService.getRatingCount(newRatingData.materialId);
            const ratingStarAverage = await this.materialService.getRatingStarAverage(newRatingData.materialId);
            const deviantStar = (newRatingData.content.star -
                oldRating.content.star);
            const newRatingStarAverage = (ratingStarAverage * ratingCount + deviantStar) / ratingCount;
            await this.materialService.updateRatingStartAverage(newRatingData.materialId, newRatingStarAverage);
        }
        return await this.ratingModel
            .findOne({ _id: newRatingData._id })
            .populate('userId')
            .populate('materialId');
    }
};
RatingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rating_schema_1.Rating.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        voting_service_1.VotingService,
        materials_service_1.MaterialsService])
], RatingsService);
exports.RatingsService = RatingsService;
//# sourceMappingURL=ratings.service.js.map