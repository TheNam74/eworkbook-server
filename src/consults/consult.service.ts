import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consult, ConsultDocument } from './schemas/consult.schema';
import CreateConsultDto from './dtos/create-consult.dto';

@Injectable()
export default class ConsultService {
  constructor(
    @InjectModel(Consult.name) private consultModel: Model<ConsultDocument>,
  ) {}

  async create(createConsultDto: CreateConsultDto): Promise<Consult> {
    const existConsult = await this.consultModel.findOne({
      phone: createConsultDto.phone,
      email: createConsultDto.email,
    });
    if (existConsult) {
      return existConsult;
    }
    const createdConsult = new this.consultModel(createConsultDto);
    return createdConsult.save();
  }

  async findAll(): Promise<Consult[]> {
    return this.consultModel.find().exec();
  }

  async findOne(id: string): Promise<Consult> {
    return this.consultModel.findById(id).exec();
  }
}
