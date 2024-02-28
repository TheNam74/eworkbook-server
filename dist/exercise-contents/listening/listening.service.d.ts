import { Model } from 'mongoose';
import { CreateListeningDto } from './dtos/create-listening.dto';
import { ListeningDocument } from './schemas/listening.schema';
export declare class ListeningService {
    private readonly exerciseModel;
    constructor(exerciseModel: Model<ListeningDocument>);
    createContent(exercise: CreateListeningDto): Promise<ListeningDocument>;
    updateContent(id: string, content: CreateListeningDto): Promise<ListeningDocument>;
    deleteContent(id: string): Promise<void>;
    getContent(id: string): Promise<ListeningDocument>;
    getStatus(assignment: any): Promise<any>;
}
