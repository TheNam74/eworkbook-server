import { AssignmentDocument } from './schemas/assignments.schema';
import { Model } from 'mongoose';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';
export declare class AssignmentsService {
    private readonly assignmentModel;
    constructor(assignmentModel: Model<AssignmentDocument>);
    getPagingAssignments(filter: any): Promise<any>;
    getOneAssignment(filter: any): Promise<any>;
    getAllAssignment(): Promise<AssignmentDocument[]>;
    getAssignmentsByUserId(userId: string): Promise<AssignmentDocument[]>;
    getAssignmentsByUserIdByTeacher(userId: string, teacherId: string): Promise<AssignmentDocument[]>;
    createAssignment(ass: CreateAssignmentDto): Promise<AssignmentDocument>;
    getAssignmentsOfBook(bookId: string, userId: string): Promise<AssignmentDocument[]>;
    getAssignmentByBookId(bookId: string): Promise<any[]>;
    deleteAssignment(bookid: string, userid: string): Promise<any>;
    updateAssignment(id: string, createAssignmentDto: CreateAssignmentDto): Promise<any>;
    checkUpdateHighestRecord(record: any, userId: string): Promise<any>;
}
