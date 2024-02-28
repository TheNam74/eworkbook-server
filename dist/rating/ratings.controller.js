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
exports.RatingsController = void 0;
const voting_service_1 = require("./voting/voting.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_rating_dto_1 = require("./dtos/create-rating.dto");
const create_voting_dto_1 = require("./voting/dtos/create-voting.dto");
const ratings_service_1 = require("./ratings.service");
let RatingsController = class RatingsController {
    constructor(ratingsService, votingService) {
        this.ratingsService = ratingsService;
        this.votingService = votingService;
    }
    createRating(createRatingDto) {
        return this.ratingsService.createRating(createRatingDto);
    }
    getRatings(filter) {
        return this.ratingsService.getRatings(filter);
    }
    getSingleRatings(filter) {
        return this.ratingsService.getSingleRating(filter);
    }
    createVoting(createVotingDto) {
        return this.ratingsService.createVoting(createVotingDto);
    }
    getVoting(filter) {
        return this.votingService.getVoting(filter);
    }
    getSingleVoting(filter) {
        return this.votingService.getSingleVoting(filter);
    }
    getStarRatio(filter) {
        return this.ratingsService.getStarRatio(filter);
    }
    getRatingByMaterial(filter) {
        return this.ratingsService.getRatingByMaterialIDAndPaging(filter);
    }
    updateRating(createRatingDto) {
        return this.ratingsService.updateRating(createRatingDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: create_rating_dto_1.CreateRatingDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rating_dto_1.CreateRatingDto]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "createRating", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "getRatings", null);
__decorate([
    (0, common_1.Get)('/single'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "getSingleRatings", null);
__decorate([
    (0, common_1.Post)('/voting'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_voting_dto_1.CreateVotingDto]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "createVoting", null);
__decorate([
    (0, common_1.Get)('/voting'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "getVoting", null);
__decorate([
    (0, common_1.Get)('/singleVoting'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "getSingleVoting", null);
__decorate([
    (0, common_1.Get)('/ratio'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "getStarRatio", null);
__decorate([
    (0, common_1.Get)('/paging'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "getRatingByMaterial", null);
__decorate([
    (0, common_1.Patch)('/update'),
    (0, swagger_1.ApiBody)({ type: create_rating_dto_1.CreateRatingDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rating_dto_1.CreateRatingDto]),
    __metadata("design:returntype", void 0)
], RatingsController.prototype, "updateRating", null);
RatingsController = __decorate([
    (0, common_1.Controller)('ratings'),
    (0, swagger_1.ApiTags)('Rating'),
    __metadata("design:paramtypes", [ratings_service_1.RatingsService,
        voting_service_1.VotingService])
], RatingsController);
exports.RatingsController = RatingsController;
//# sourceMappingURL=ratings.controller.js.map