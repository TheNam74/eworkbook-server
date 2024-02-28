import CreateMakeSentenceDto from './dtos/create-make-sentence.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MakeSentence,
  MakeSentenceDocument,
} from './schemas/make-sentence.schema';
import * as _ from 'lodash';

@Injectable()
export class MakeSentenceService {
  constructor(
    @InjectModel(MakeSentence.name)
    private readonly exerciseModel: Model<MakeSentenceDocument>,
  ) {}

  async createContent(
    exercise: CreateMakeSentenceDto,
  ): Promise<MakeSentenceDocument> {
    return await this.exerciseModel.create(exercise);
  }

  async updateContent(
    id: string,
    content: CreateMakeSentenceDto,
  ): Promise<MakeSentenceDocument> {
    return await this.exerciseModel.findByIdAndUpdate(id, content);
  }
  async deleteContent(id: string): Promise<void> {
    return await this.exerciseModel.findByIdAndDelete(id);
  }
  async getContent(id: string): Promise<MakeSentenceDocument> {
    return await this.exerciseModel.findById(id).exec();
  }
  async getStatus(assignment: any): Promise<any> {
    try {
      const status = [];
      const content = await this.getContent(assignment.content._id);
      const userSentences = assignment.content.detail.sentences;
      for (const sentenece of userSentences) {
        const sentenceUserChoice = [];
        for (const question of sentenece.questions) {
          sentenceUserChoice.push({
            questionKey: question.questionKey,
            answerKey: question.options.find((item) => item.chosen)?.key,
          });
        }
        status.push({
          sentenceKey: sentenece.sentenceKey,
          correct: _.isEqual(
            content.correctAnswer.find(
              (item) => item.sentenceKey == sentenece.sentenceKey,
            ).answer,
            sentenceUserChoice,
          ),
          correctAnswer: content.correctAnswer.find(
            (item) => item.sentenceKey == sentenece.sentenceKey,
          ).answer,
          userAnswer: sentenceUserChoice,
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
