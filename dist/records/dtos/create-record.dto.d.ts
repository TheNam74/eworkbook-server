export declare class CreateRecordDto {
    time: Date;
    name: string;
    parent: any;
    root: any;
    userId: string;
    numberCorrect: number;
    totalQuestion: number;
    children: RecordChild[];
}
declare class RecordChild {
    userAnswer: any;
    exerciseId: string;
}
export {};
