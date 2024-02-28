declare class SortDetailDto {
    mainContent: string;
    questions: [
        {
            questionIndex: number;
            questionElements: [
                {
                    elementImg: string;
                    elementId: number;
                }
            ];
        }
    ];
}
export default class CreateSortDto {
    detail: SortDetailDto;
    correctAnswer: [{
        questionIndex: number;
        key: number[];
    }];
}
export {};
