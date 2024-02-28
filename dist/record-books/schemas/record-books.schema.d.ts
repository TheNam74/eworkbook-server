import { Material } from '../../materials/schemas/material.schema';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';
export type RecordBookDocument = RecordBook & Document;
export declare class RecordBook {
    name: string;
    material: Material;
    time: Date;
    userId: User;
    numberOfLeafTotal: number;
    LeafDone: Array<string>;
    children: Array<any>;
}
export declare const RecordBookSchema: mongoose.Schema<RecordBook, mongoose.Model<RecordBook, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RecordBook>;
