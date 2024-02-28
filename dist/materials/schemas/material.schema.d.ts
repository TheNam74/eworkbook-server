import mongoose, { Document } from 'mongoose';
export type MaterialDocument = Material & Document;
export declare class Material {
    content: string;
    name: string;
    depthLevel: number;
    CEFR: string;
    isLeaf: boolean;
    coverImg: string;
    description: string;
    type: string;
    parent: string;
    children: Array<Material>;
    totalStudents: number;
    exercises: Array<string>;
    ratingCount: number;
    ratingStarAverage: number;
    author: string;
    timeCreate: Date;
    status: string;
    redoTimes: number;
    canReview: boolean;
    publicScore: boolean;
    limitTime: string;
    isLimitTime: boolean;
    isPublicForOtherTeacher: boolean;
}
export declare const MaterialSchema: mongoose.Schema<Material, mongoose.Model<Material, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Material>;
