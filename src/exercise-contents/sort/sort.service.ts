import CreateSortDto from './dtos/create-sort.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sort, SortDocument } from './schemas/sort.schema';
import * as _ from 'lodash';

@Injectable()
export class SortService {
  constructor(
    @InjectModel(Sort.name)
    private readonly exerciseModel: Model<SortDocument>,
  ) {}

  async createContent(exercise: CreateSortDto): Promise<SortDocument> {
    return await this.exerciseModel.create(exercise);
  }

  async updateContent(
    id: string,
    content: CreateSortDto,
  ): Promise<SortDocument> {
    return await this.exerciseModel.findByIdAndUpdate(id, content);
  }
  async deleteContent(id: string): Promise<void> {
    return await this.exerciseModel.findByIdAndDelete(id);
  }
  async getContent(id: string): Promise<SortDocument> {
    return await this.exerciseModel.findById(id).exec();
  }
  async getStatus(assignment: any): Promise<any> {
    try {
      const status = [];
      const content = await this.getContent(assignment.content._id);
      for (const answer of assignment.content.detail) {
        const correctAnswer = content.correctAnswer.find(
          (item) => item.questionIndex == answer.questionIndex,
        ).key;
        const userAnswer = answer.userAnswer;
        status.push({
          correct: _.isEqual(correctAnswer, userAnswer),
          correctAnswer,
          userAnswer,
        });
      }
      return {
        exerciseId: assignment._id,
        contentId: content._id,
        detail: content.detail,
        status,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
