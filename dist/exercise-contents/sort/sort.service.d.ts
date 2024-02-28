import CreateSortDto from './dtos/create-sort.dto';
import { Model } from 'mongoose';
import { SortDocument } from './schemas/sort.schema';
export declare class SortService {
    private readonly exerciseModel;
    constructor(exerciseModel: Model<SortDocument>);
    createContent(exercise: CreateSortDto): Promise<SortDocument>;
    updateContent(id: string, content: CreateSortDto): Promise<SortDocument>;
    deleteContent(id: string): Promise<void>;
    getContent(id: string): Promise<SortDocument>;
    getStatus(assignment: any): Promise<any>;
}
