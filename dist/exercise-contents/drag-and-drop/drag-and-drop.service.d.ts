import { Model } from 'mongoose';
import { CreateDragAndDropDto } from './dtos/create-drag-and-drop.dto';
import { DragAndDropDocument } from './schemas/drag-and-drop.schema';
export declare class DragAndDropService {
    private readonly exerciseModel;
    constructor(exerciseModel: Model<DragAndDropDocument>);
    createContent(exercise: CreateDragAndDropDto): Promise<DragAndDropDocument>;
    updateContent(id: string, content: CreateDragAndDropDto): Promise<DragAndDropDocument>;
    deleteContent(id: string): Promise<void>;
    getContent(id: string): Promise<DragAndDropDocument>;
    getStatus(assignment: any): Promise<any>;
}
