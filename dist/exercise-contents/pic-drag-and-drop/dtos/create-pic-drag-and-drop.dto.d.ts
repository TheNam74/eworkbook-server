declare class PicDragAndDropCoordinateDto {
    top: number;
    left: number;
    id: number;
}
declare class PicDragAndDropGivenWordDto {
    id: number;
    word: string;
}
declare class PicDragAndDropDetailDto {
    givenWords: PicDragAndDropGivenWordDto[];
    coordinates: PicDragAndDropCoordinateDto[];
}
declare class PicDragAndDropKeyDto {
    coordinateId: number;
    key: string;
}
export declare class CreatePicDragAndDropDto {
    detail: PicDragAndDropDetailDto;
    correctAnswer: PicDragAndDropKeyDto[];
}
export {};
