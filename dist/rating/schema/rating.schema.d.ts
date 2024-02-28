import mongoose, { Document } from 'mongoose';
export type RatingDocument = Rating & Document;
declare class RatingContent {
    ratingText: string;
    star: number;
}
export declare class Rating {
    materialId: string;
    userId: string;
    createdDate: Date;
    content: RatingContent;
    upVote: number;
    downVote: number;
}
export declare const RatingSchema: mongoose.Schema<Rating, mongoose.Model<Rating, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Rating>;
export {};
