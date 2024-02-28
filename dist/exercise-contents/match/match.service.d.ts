import { Model } from 'mongoose';
import { CreateMatchDto } from './dtos/create-match.dto';
import { MatchDocument } from './schemas/match.schema';
export declare class MatchService {
    private readonly exerciseModel;
    constructor(exerciseModel: Model<MatchDocument>);
    createContent(exercise: CreateMatchDto): Promise<MatchDocument>;
    updateContent(id: string, content: CreateMatchDto): Promise<MatchDocument>;
    deleteContent(id: string): Promise<void>;
    getContent(id: string): Promise<MatchDocument>;
    getStatus(assignment: any): Promise<any>;
}
