import { CrosswordDocument } from './schema/crossword.schema';
import { CreateCrosswordDto } from './dtos/create-crossword.dto';
import { Model } from 'mongoose';
export declare class CrosswordService {
    private readonly exerciseModel;
    constructor(exerciseModel: Model<CrosswordDocument>);
    createContent(exercise: CreateCrosswordDto): Promise<CrosswordDocument>;
    updateContent(id: string, content: CreateCrosswordDto): Promise<CrosswordDocument>;
    deleteContent(id: string): Promise<void>;
    getContent(id: string): Promise<CrosswordDocument>;
    getStatus(assignment: any): Promise<any>;
}
