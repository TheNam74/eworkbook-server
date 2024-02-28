declare class CrosswordDetailDto {
    answer: string;
    clue: string;
    orientation: string;
    position: number[];
}
export declare class CreateCrosswordDto {
    detail: CrosswordDetailDto[];
    correctAnswer: CrosswordDetailDto[];
}
export {};
