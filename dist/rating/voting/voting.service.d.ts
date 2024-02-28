import { CreateVotingDto } from './dtos/create-voting.dto';
import { VotingDocument } from './schema/voting.schema';
import { Model } from 'mongoose';
export declare class VotingService {
    private readonly votingModel;
    constructor(votingModel: Model<VotingDocument>);
    getVoting(filter: any): Promise<any>;
    getSingleVoting(filter: any): Promise<any>;
    deleteVotingById(id: any): Promise<any>;
    createVoting(voting: CreateVotingDto): Promise<any>;
}
