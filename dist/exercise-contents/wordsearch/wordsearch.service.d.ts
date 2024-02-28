import CreateWordsearchDto from './dtos/create-wordsearch.dto';
import { Model } from 'mongoose';
import { WordsearchDocument } from './schemas/wordsearch.schema';
export declare class WordsearchService {
    private readonly exerciseModel;
    constructor(exerciseModel: Model<WordsearchDocument>);
    createContent(exercise: CreateWordsearchDto): Promise<WordsearchDocument>;
    updateContent(id: string, content: CreateWordsearchDto): Promise<WordsearchDocument>;
    deleteContent(id: string): Promise<void>;
    getContent(id: string): Promise<WordsearchDocument>;
    getStatus(assignment: any): Promise<any>;
}
