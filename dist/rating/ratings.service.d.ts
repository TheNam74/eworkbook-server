import { MaterialsService } from '../materials/materials.service';
import { VotingService } from './voting/voting.service';
import { RatingDocument } from './schema/rating.schema';
import { Model } from 'mongoose';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { CreateVotingDto } from './voting/dtos/create-voting.dto';
export declare class RatingsService {
    private readonly ratingModel;
    private votingService;
    private materialService;
    constructor(ratingModel: Model<RatingDocument>, votingService: VotingService, materialService: MaterialsService);
    createRating(rating: CreateRatingDto): Promise<any>;
    getRatings(filter: any): Promise<any>;
    getRatingByMaterialIDAndPaging(filter: any): Promise<any>;
    getSingleRating(filter: any): Promise<any>;
    createVoting(voting: CreateVotingDto): Promise<any>;
    upVote(ratingId: any): Promise<any>;
    downVote(ratingId: any): Promise<any>;
    deleteUpVote(deletedVote: any): Promise<any>;
    deleteDownVote(deletedVote: any): Promise<any>;
    getStarRatio(filter: any): Promise<any>;
    updateRating(newRatingData: any): Promise<any>;
}
