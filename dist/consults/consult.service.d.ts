import { Model } from 'mongoose';
import { Consult, ConsultDocument } from './schemas/consult.schema';
import CreateConsultDto from './dtos/create-consult.dto';
export default class ConsultService {
    private consultModel;
    constructor(consultModel: Model<ConsultDocument>);
    create(createConsultDto: CreateConsultDto): Promise<Consult>;
    findAll(): Promise<Consult[]>;
    findOne(id: string): Promise<Consult>;
}
