import CreateMakeSentenceDto from './dtos/create-make-sentence.dto';
import { Model } from 'mongoose';
import { MakeSentenceDocument } from './schemas/make-sentence.schema';
export declare class MakeSentenceService {
    private readonly exerciseModel;
    constructor(exerciseModel: Model<MakeSentenceDocument>);
    createContent(exercise: CreateMakeSentenceDto): Promise<MakeSentenceDocument>;
    updateContent(id: string, content: CreateMakeSentenceDto): Promise<MakeSentenceDocument>;
    deleteContent(id: string): Promise<void>;
    getContent(id: string): Promise<MakeSentenceDocument>;
    getStatus(assignment: any): Promise<any>;
}
