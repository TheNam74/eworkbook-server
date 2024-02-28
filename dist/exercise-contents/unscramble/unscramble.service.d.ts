import { Model } from 'mongoose';
import { CreateUnscrambleDto } from './dtos/create-unscramble.dto';
import { UnscrambleDocument } from './schemas/unscramble.schema';
export declare class UnscrambleService {
    private readonly exerciseModel;
    constructor(exerciseModel: Model<UnscrambleDocument>);
    createContent(exercise: CreateUnscrambleDto): Promise<UnscrambleDocument>;
    updateContent(id: string, content: CreateUnscrambleDto): Promise<UnscrambleDocument>;
    deleteContent(id: string): Promise<void>;
    getContent(id: string): Promise<UnscrambleDocument>;
    getStatus(assignment: any): Promise<any>;
}
