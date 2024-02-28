import { CreateVotingDto } from './dtos/create-voting.dto';
import { Voting, VotingDocument } from './schema/voting.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class VotingService {
  constructor(
    @InjectModel(Voting.name)
    private readonly votingModel: Model<VotingDocument>,
  ) {}

  async getVoting(filter): Promise<any> {
    return await this.votingModel.find(filter);
  }
  async getSingleVoting(filter): Promise<any> {
    return await this.votingModel.findOne(filter);
  }
  async deleteVotingById(id): Promise<any> {
    return await this.votingModel.deleteOne({ _id: id });
  }
  async createVoting(voting: CreateVotingDto): Promise<any> {
    const newRating = new this.votingModel(voting);
    await newRating.save();
    return newRating;
  }
}
