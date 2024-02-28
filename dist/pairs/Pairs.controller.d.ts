import { PairsService } from './Pairs.service';
import { Pair } from './schemas/pairs.schema';
export declare class PairsController {
    private readonly PairsService;
    constructor(PairsService: PairsService);
    getAllPairs(): Promise<Pair[]>;
    getPairsByUserId(id: string): Promise<Pair[]>;
    getPagingPairs(filter: any): Promise<Pair[]>;
    getPairById(id: string): Promise<Pair>;
    createPair(teacherId: string, studentId: string): Promise<Pair>;
}
