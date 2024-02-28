declare class MatchColDataDto {
    id: string;
    element: string;
}
declare class MatchDataDto {
    colKey: number;
    colData: MatchColDataDto[];
}
declare class MatchDetailDto {
    totalCol: number;
    data: MatchDataDto;
}
declare class MatchPairDto {
    first: string;
    second: string;
}
export declare class CreateMatchDto {
    detail: MatchDetailDto;
    correctAnswer: MatchPairDto[];
}
export {};
