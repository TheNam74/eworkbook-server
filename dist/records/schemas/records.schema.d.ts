import { Material } from './../../materials/schemas/material.schema';
import mongoose, { Document } from 'mongoose';
export type RecordDocument = Record & Document;
export declare class Record {
    time: Date;
    name: string;
    userId: string;
    parent: Material;
    root: Material;
    numberCorrect: number;
    totalQuestion: number;
    children: Array<RecordChild>;
}
export declare class RecordChild {
    userAnswer: any;
    exerciseId: string;
}
export declare const RecordSchema: mongoose.Schema<Record, mongoose.Model<Record, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Record>;
