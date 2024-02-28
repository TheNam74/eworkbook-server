declare class ListeningQuestionDto {
    questionId: string;
    questionAudio: string;
}
declare class ListeningAnswerDto {
    answerId: string;
    answerImg: string;
    answerText: string;
}
declare class ListeningDetailDto {
    questionArray: ListeningAnswerDto[];
    answerArray: ListeningQuestionDto[];
}
declare class ListeningCorrectAnwserDto {
    questionId: string;
    answerId: string;
}
export declare class CreateListeningDto {
    detail: ListeningDetailDto;
    correctAnswer: ListeningCorrectAnwserDto[];
}
export {};
