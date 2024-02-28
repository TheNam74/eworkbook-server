import { AssignmentsService } from './../assignment/assignments.service';
import { RecordBooksService } from './../record-books/record-books.service';
import { RecordDocument } from './schemas/records.schema';
import { Model } from 'mongoose';
import { CreateRecordDto } from './dtos/create-record.dto';
import { UsersService } from 'src/users/users.service';
export declare class RecordsService {
    private readonly recordModel;
    private readonly recordBookService;
    private readonly assignmentService;
    private readonly usersService;
    constructor(recordModel: Model<RecordDocument>, recordBookService: RecordBooksService, assignmentService: AssignmentsService, usersService: UsersService);
    getPagingRecords(filter: any): Promise<any>;
    getPagingHighestRecords(filter: any): Promise<any>;
    getAllRecord(): Promise<RecordDocument[]>;
    getRecordsByUserId(userId: string): Promise<RecordDocument[]>;
    createRecord(materialService: any, exercise: CreateRecordDto): Promise<RecordDocument>;
    getRecordsOfBook(bookId: string, userId: string): Promise<RecordDocument[]>;
    getRecordById(id: string): Promise<RecordDocument>;
    getDoTimes(id: string, userId: string): Promise<any>;
    checkRecord(materialId: string, email: string): Promise<any>;
}
