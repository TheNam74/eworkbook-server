import { User } from './../../users/schemas/users.schema';
import mongoose, { Document } from 'mongoose';
export type PairDocument = Pair & Document;
export declare class Pair {
    teacher: User;
    student: User;
}
export declare const PairSchema: mongoose.Schema<Pair, mongoose.Model<Pair, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Pair>;
