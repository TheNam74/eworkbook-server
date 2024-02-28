import { LineWordSearchDocument } from './schemas/line-word-search.schema';
import { Model } from 'mongoose';
import { CreateLineWordSearchDto } from './dtos/create-line-word-search.dto';
export declare class LineWordSearchService {
    private readonly exerciseModel;
    constructor(exerciseModel: Model<LineWordSearchDocument>);
    createContent(exercise: CreateLineWordSearchDto): Promise<LineWordSearchDocument>;
    updateContent(id: string, content: CreateLineWordSearchDto): Promise<LineWordSearchDocument>;
    deleteContent(id: string): Promise<void>;
    getContent(id: string): Promise<LineWordSearchDocument>;
    getStatus(assignment: any): Promise<any>;
}
