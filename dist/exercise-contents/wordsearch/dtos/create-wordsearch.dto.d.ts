declare class WordsearchDetailDto {
    grid: string[][];
    words: WordsearchElementDto[];
}
declare class WordsearchElementDto {
    word: string;
    start: {
        x: number;
        y: number;
    };
    end: {
        x: number;
        y: number;
    };
}
export default class CreateWordsearchDto {
    detail: WordsearchDetailDto;
    correctAnswer: string[];
}
export {};
