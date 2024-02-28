import { VotingService } from './voting/voting.service';
import { Voting } from './voting/schema/voting.schema';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { CreateVotingDto } from './voting/dtos/create-voting.dto';
import { RatingsService } from './ratings.service';
import { Rating } from './schema/rating.schema';
export declare class RatingsController {
    private ratingsService;
    private votingService;
    constructor(ratingsService: RatingsService, votingService: VotingService);
    createRating(createRatingDto: CreateRatingDto): Promise<Rating>;
    getRatings(filter: any): Promise<Rating[]>;
    getSingleRatings(filter: any): Promise<Rating>;
    createVoting(createVotingDto: CreateVotingDto): Promise<Voting>;
    getVoting(filter: any): Promise<Voting[]>;
    getSingleVoting(filter: any): Promise<Voting[]>;
    getStarRatio(filter: any): Promise<number>;
    getRatingByMaterial(filter: any): Promise<Rating[]>;
    updateRating(createRatingDto: CreateRatingDto): Promise<any>;
}
