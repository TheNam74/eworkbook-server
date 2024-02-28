import { RecordBooksService } from './record-books.service';
import { RecordBook } from './schemas/record-books.schema';
export declare class RecordBooksController {
    private readonly recordBooksService;
    constructor(recordBooksService: RecordBooksService);
    getAllRecordBooks(): Promise<RecordBook[]>;
    getRecordBooksByUserId(id: string): Promise<RecordBook[]>;
    getPagingMaterials(filter: any): Promise<RecordBook[]>;
    alsoLearn(id: string, userId: string): Promise<any>;
    getMaterialRootLearningSudent(id: string): Promise<any>;
    getRecordBook(userId: string, bookId: string): Promise<RecordBook>;
}
