import { Model } from 'mongoose';
import { CreatePicDragAndDropDto } from './dtos/create-pic-drag-and-drop.dto';
import { PicDragAndDropDocument } from './schemas/pic-drag-and-drop.schema';
export declare class PicDragAndDropService {
    private readonly exerciseModel;
    constructor(exerciseModel: Model<PicDragAndDropDocument>);
    createContent(exercise: CreatePicDragAndDropDto): Promise<PicDragAndDropDocument>;
    updateContent(id: string, content: CreatePicDragAndDropDto): Promise<PicDragAndDropDocument>;
    deleteContent(id: string): Promise<void>;
    getContent(id: string): Promise<PicDragAndDropDocument>;
    getStatus(assignment: any): Promise<any>;
}
