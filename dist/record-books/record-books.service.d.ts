import { RecordBookDocument } from './schemas/record-books.schema';
import { Model } from 'mongoose';
import { CreateRecordBookDto } from './dtos/create-record-books.dto';
export declare class RecordBooksService {
    private readonly RecordBookModel;
    constructor(RecordBookModel: Model<RecordBookDocument>);
    getPagingMaterials(filter: any): Promise<any>;
    getRecordBook(userId: string, bookId: string): Promise<RecordBookDocument>;
    getAllRecordBook(): Promise<RecordBookDocument[]>;
    getRecordBooksByUserId(userId: string): Promise<RecordBookDocument[]>;
    createRecordBook(exercise: CreateRecordBookDto): Promise<RecordBookDocument>;
    checkUpdateRecordBookFromRecord(materialService: any, record: any, userId: string): Promise<void>;
    getOneRecordBook(bookId: string, userId: string): Promise<RecordBookDocument>;
    getUsersLearningThisBook(bookId: string, userId: string): Promise<any>;
    countLeafsOfThis(material: any): number;
    checkArrayContains(array: any, value: any): boolean;
    getTopStudentsMaterialId(): Promise<any>;
    getTotalStudents(materialId: string): Promise<any>;
}
