declare class TextAndImageDto {
    text: string;
    img: string;
}
declare class QuestionMultipleChoiceDto {
    id: string;
    questionText: string;
    questionImg: string;
    answers: TextAndImageDto[];
}
export declare class CreateMultipleChoiceDto {
    detail: QuestionMultipleChoiceDto[];
    correctAnswer: [[number]];
}
export {};
