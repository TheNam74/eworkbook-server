declare class LineWordSearchDetailDto {
    questionId: string;
    findWord: string;
    content: string;
    image: string;
}
declare class LineWordSearchCorrectAnswerDto {
    questionId: string;
    position: number;
    length: number;
}
export declare class CreateLineWordSearchDto {
    detail: LineWordSearchDetailDto[];
    correctAnswer: LineWordSearchCorrectAnswerDto[];
}
export {};
