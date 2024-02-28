declare class DragAndDropQuestionDto {
    contextId: string;
    context: string;
    contextImg: string;
}
declare class DragAndDropDetailDto {
    givenWords: string[];
    contextArray: DragAndDropQuestionDto[];
}
declare class DragAndDropKeyDto {
    contextId: string;
    key: string;
}
export declare class CreateDragAndDropDto {
    detail: DragAndDropDetailDto;
    correctAnswer: DragAndDropKeyDto[];
}
export {};
