declare class RatingContent {
    ratingText: string;
    star: number;
}
export declare class CreateRatingDto {
    id: string;
    materialId: string;
    userId: string;
    createdDate: Date;
    content: RatingContent;
    upVote: number;
    downVote: number;
}
export {};
