import { PairDocument } from './schemas/pairs.schema';
import { Model } from 'mongoose';
import { CreatePairDto } from './dtos/create-pair.dto';
import { UsersService } from 'src/users/users.service';
export declare class PairsService {
    private readonly PairModel;
    private readonly usersService;
    constructor(PairModel: Model<PairDocument>, usersService: UsersService);
    getPagingPairs(filter: any): Promise<any>;
    getAllPair(): Promise<PairDocument[]>;
    getPairsByUserId(userId: string): Promise<PairDocument[]>;
    createPair(pairDto: CreatePairDto): Promise<PairDocument>;
    getPairById(id: string): Promise<PairDocument>;
}
