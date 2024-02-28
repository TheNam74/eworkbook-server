import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMatchDto } from './dtos/create-match.dto';
import { Match, MatchDocument } from './schemas/match.schema';

import * as _ from 'lodash';
@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match.name)
    private readonly exerciseModel: Model<MatchDocument>,
  ) {}

  async createContent(exercise: CreateMatchDto): Promise<MatchDocument> {
    return await this.exerciseModel.create(exercise);
  }
  async updateContent(
    id: string,
    content: CreateMatchDto,
  ): Promise<MatchDocument> {
    return await this.exerciseModel.findByIdAndUpdate(id, content);
  }
  async deleteContent(id: string): Promise<void> {
    return await this.exerciseModel.findByIdAndDelete(id);
  }
  async getContent(id: string): Promise<MatchDocument> {
    return await this.exerciseModel.findById(id).exec();
  }

  async getStatus(assignment: any): Promise<any> {
    try {
      const status = [];
      const exercise = await this.getContent(assignment.content._id);
      for (let i = 0; i < exercise.correctAnswer?.length; i++) {
        const key = [
          exercise.correctAnswer[i].first,
          exercise.correctAnswer[i].second,
        ];
        const userMatch = [];
        if (assignment.content?.detail?.userChoice) {
          for (const userLine of assignment.content?.detail?.userChoice) {
            if (
              userLine.first === key[0] ||
              userLine.second === key[0] ||
              userLine.first === key[1] ||
              userLine.second === key[1]
            ) {
              userMatch.push(userLine.first);
              userMatch.push(userLine.second);
            }
          }
          status.push({
            correct: _.isEqual(_.sortBy(key), _.sortBy(userMatch)),
            correctAnswer: _.sortBy(key),
            userChoice: _.sortBy(userMatch),
          });
        } else {
          status.push({
            correct: false,
            correctAnswer: key,
            userChoice: [],
          });
        }
      }
      return {
        exerciseId: assignment._id,
        contentId: exercise._id,
        detail: exercise.detail,
        status,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
