import mongoose, { Document } from 'mongoose';
export type ExerciseDocument = Exercise & Document;
export declare class Exercise {
    exerciseType: string;
    title: string;
    parentMaterial: string;
    dateAdded: Date;
    content: string;
    exerciseAudio: string;
}
export declare const ExerciseSchema: mongoose.Schema<Exercise, mongoose.Model<Exercise, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Exercise>;
