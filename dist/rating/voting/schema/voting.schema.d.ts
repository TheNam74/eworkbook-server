import mongoose, { Document } from 'mongoose';
export type VotingDocument = Voting & Document;
export declare class Voting {
    userId: string;
    ratingId: string;
    type: string;
}
export declare const VotingSchema: mongoose.Schema<Voting, mongoose.Model<Voting, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Voting>;
