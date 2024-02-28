declare class FillBlankQuestionDto {
    questionId: string;
    questionText: string;
    questionImg: string;
}
declare class FillBlankDetailDto {
    mainText: string;
    mainImg: string;
    questionArray: FillBlankQuestionDto[];
}
declare class FillBlankKeyDto {
    quesionId: string;
    key: string;
}
export declare class CreateFillBlankDto {
    detail: FillBlankDetailDto;
    correctAnswer: FillBlankKeyDto[];
}
export {};
