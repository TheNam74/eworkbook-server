import ConsultService from './consult.service';
import CreateConsultDto from './dtos/create-consult.dto';
export declare class ConsultController {
    private readonly consultService;
    constructor(consultService: ConsultService);
    create(createConsultDto: CreateConsultDto): Promise<import("./schemas/consult.schema").Consult>;
    findAll(): Promise<import("./schemas/consult.schema").Consult[]>;
    findOne(id: string): Promise<import("./schemas/consult.schema").Consult>;
}
