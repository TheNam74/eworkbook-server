import { RecordsService } from './records.service';
import { Record } from './schemas/records.schema';
export declare class RecordsController {
    private readonly recordsService;
    constructor(recordsService: RecordsService);
    getAllRecords(): Promise<Record[]>;
    getRecordsByUserId(id: string): Promise<Record[]>;
    getPagingRecords(filter: any): Promise<Record[]>;
    getPagingHighestRecords(filter: any): Promise<Record[]>;
    getRecordsOfBook(id: string, userId: string): Promise<Record[]>;
    getRecordById(id: string): Promise<Record>;
    getDoTimes(userId: any, id: string): Promise<any>;
    checkRecord(materialId: string, email: string): Promise<any>;
}
