import { Material } from '../../materials/schemas/material.schema';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';
import { Record } from 'src/records/schemas/records.schema';
export type AssignmentDocument = Assignment & Document;
export declare class Assignment {
    createdAt?: Date;
    deadline: Date;
    student: User;
    teacher: User;
    material: Material;
    status: string;
    redoTimes: number;
    canReview: boolean;
    publicScore: boolean;
    limitTime: string;
    isLimitTime: boolean;
    record: Record;
}
export declare const AssignmentSchema: mongoose.Schema<Assignment, mongoose.Model<Assignment, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Assignment>;
