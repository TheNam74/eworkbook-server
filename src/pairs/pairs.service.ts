import { PairDocument, Pair } from './schemas/pairs.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePairDto } from './dtos/create-pair.dto';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class PairsService {
  constructor(
    @InjectModel(Pair.name)
    private readonly PairModel: Model<PairDocument>,
    private readonly usersService: UsersService,
  ) { }
  async getPagingPairs(filter: any): Promise<any> {
    if (filter.pageSize === 0) filter.pageSize = 1;
    const skip = filter.pageSize * filter.current - filter.pageSize;
    const limit = filter.pageSize;

    if (filter.studentemail) {
      const similarEmailStudents = await this.usersService.getSimilarEmail(filter.studentemail);
      const similarEmailStudentIds = similarEmailStudents.map((student) => student._id);
      const data = await this.PairModel
        .find({ student: { $in: similarEmailStudentIds } })
        .populate('teacher')
        .populate('student')
        .skip(skip)
        .limit(limit)
        .exec();
      const total = await this.PairModel
        .find({ student: { $in: similarEmailStudentIds } })
        .populate('teacher')
        .populate('student')
        .countDocuments()
        .exec();
      return { data, total };
    }
    //console.log('filter:', filter);

    const data = await this.PairModel
      .find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate('teacher')
      .populate('student')
      .exec();
    const total = await this.PairModel.countDocuments(filter);
    return { data, total };
  }
  async getAllPair(): Promise<PairDocument[]> {
    return await this.PairModel.find().exec();
  }
  async getPairsByUserId(userId: string): Promise<PairDocument[]> {
    try {
      const Pairs = await this.PairModel
        .find({ teacher: userId })
        .populate('teacher')
        .populate('student')
        .exec();
      return Pairs;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createPair(
    pairDto: CreatePairDto,
  ): Promise<PairDocument> {
    const checkAlreadyExist = await this.PairModel.findOne({ teacher: pairDto.teacher, student: pairDto.student }).populate('teacher').populate('student').exec();
    if (checkAlreadyExist) return checkAlreadyExist;
    const Pair = new this.PairModel(pairDto);
    await Pair.save();

    return await this.PairModel.findOne(Pair._id).populate('teacher').populate('student').exec();
  }
  async getPairById(id: string): Promise<PairDocument> {
    return await this.PairModel.findById(id).populate('teacher').populate('student').exec();
  }
}
