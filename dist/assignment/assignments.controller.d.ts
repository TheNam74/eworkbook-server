import { CreateAssignmentDto } from './dtos/create-assignment.dto';
import { AssignmentsService } from './assignments.service';
import { Assignment } from './schemas/assignments.schema';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    getAllAssignments(): Promise<Assignment[]>;
    getAssignmentsByUserId(id: string): Promise<Assignment[]>;
    getAssignmentsByUserIdByTeacher(id: string, teacherId: string): Promise<Assignment[]>;
    getPagingAssignment(filter: any): Promise<Assignment[]>;
    getOneAssgnemnt(filter: any): Promise<Assignment[]>;
    getAssignmentsOfBook(id: string, userId: string): Promise<Assignment[]>;
    createMaterial(createAssignmentDto: CreateAssignmentDto): Promise<Assignment>;
    getAssignmentByBookId(bookId: string): Promise<Assignment[]>;
    deleteAssignment(bookid: string, userid: string): Promise<Assignment>;
    updateAssignment(id: string, createAssignmentDto: CreateAssignmentDto): Promise<Assignment>;
}
