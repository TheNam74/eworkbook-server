import { Model } from 'mongoose';
import { CreateFillBlankDto } from './dtos/create-fill-blank.dto';
import { FillBlankDocument } from './schemas/fill-blank.schema';
export declare class FillBlankService {
    private readonly exerciseModel;
    constructor(exerciseModel: Model<FillBlankDocument>);
    createContent(exercise: CreateFillBlankDto): Promise<FillBlankDocument>;
    updateContent(id: string, content: CreateFillBlankDto): Promise<FillBlankDocument>;
    deleteContent(id: string): Promise<void>;
    getContent(id: string): Promise<FillBlankDocument>;
    getStatus(assignment: any): Promise<any>;
}
