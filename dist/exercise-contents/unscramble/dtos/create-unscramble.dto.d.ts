declare class UnscrambleQuestionDto {
    questionId: string;
    questionText: string;
    questionImg: string;
}
declare class UnscrambleDetailDto {
    mainText: string;
    mainImg: string;
    questionArray: UnscrambleQuestionDto[];
    isCharacterScramble: boolean;
}
declare class UnscrambleKeyDto {
    quesionId: string;
    key: string;
}
export declare class CreateUnscrambleDto {
    detail: UnscrambleDetailDto;
    correctAnswer: UnscrambleKeyDto[];
}
export {};
