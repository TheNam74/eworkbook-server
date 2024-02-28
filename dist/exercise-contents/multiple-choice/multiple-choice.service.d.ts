import { CreateMultipleChoiceDto } from './dtos/create-multiple-choice.dto';
import { Model } from 'mongoose';
import { MultipleChoiceDocument } from './schemas/multiple-choice.schema';
export declare class MultipleChoiceService {
    private readonly exerciseModel;
    constructor(exerciseModel: Model<MultipleChoiceDocument>);
    createContent(exercise: CreateMultipleChoiceDto): Promise<MultipleChoiceDocument>;
    updateContent(id: string, content: CreateMultipleChoiceDto): Promise<MultipleChoiceDocument>;
    deleteContent(id: string): Promise<void>;
    getContent(id: string): Promise<MultipleChoiceDocument>;
    getStatus(assignment: any): Promise<any>;
}
