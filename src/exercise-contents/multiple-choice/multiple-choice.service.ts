import { CreateMultipleChoiceDto } from './dtos/create-multiple-choice.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as _ from 'lodash';
import {
  MultipleChoice,
  MultipleChoiceDocument,
} from './schemas/multiple-choice.schema';

@Injectable()
export class MultipleChoiceService {
  constructor(
    @InjectModel(MultipleChoice.name)
    private readonly exerciseModel: Model<MultipleChoiceDocument>,
  ) {}

  async createContent(
    exercise: CreateMultipleChoiceDto,
  ): Promise<MultipleChoiceDocument> {
    return await this.exerciseModel.create(exercise);
  }

  async updateContent(
    id: string,
    content: CreateMultipleChoiceDto,
  ): Promise<MultipleChoiceDocument> {
    return await this.exerciseModel.findByIdAndUpdate(id, content);
  }
  async deleteContent(id: string): Promise<void> {
    return await this.exerciseModel.findByIdAndDelete(id);
  }
  async getContent(id: string): Promise<MultipleChoiceDocument> {
    return await this.exerciseModel.findById(id).exec();
  }
  async getStatus(assignment: any): Promise<any> {
    try {
      const status = [];
      const exercise = await this.getContent(assignment.content._id);
      for (let i = 0; i < exercise.correctAnswer?.length; i++) {
        status.push({
          correct: _.isEqual(
            _.sortBy(exercise.correctAnswer[i]),
            _.sortBy(assignment.content?.detail[i]?.selected) || [],
          ),
          correctAnswer: _.sortBy(exercise.correctAnswer[i]),
          selected: _.sortBy(assignment.content?.detail[i]?.selected) || [],
        });
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
