import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUnscrambleDto } from './dtos/create-unscramble.dto';
import { Unscramble, UnscrambleDocument } from './schemas/unscramble.schema';

@Injectable()
export class UnscrambleService {
  constructor(
    @InjectModel(Unscramble.name)
    private readonly exerciseModel: Model<UnscrambleDocument>,
  ) {}

  async createContent(
    exercise: CreateUnscrambleDto,
  ): Promise<UnscrambleDocument> {
    return await this.exerciseModel.create(exercise);
  }
  async updateContent(
    id: string,
    content: CreateUnscrambleDto,
  ): Promise<UnscrambleDocument> {
    return await this.exerciseModel.findByIdAndUpdate(id, content);
  }
  async deleteContent(id: string): Promise<void> {
    return await this.exerciseModel.findByIdAndDelete(id);
  }
  async getContent(id: string): Promise<UnscrambleDocument> {
    return await this.exerciseModel.findById(id).exec();
  }
  async getStatus(assignment: any): Promise<any> {
    try {
      const status = [];
      const lowercaseFirstLetter = (string: string): string =>
        string ? string.charAt(0).toLowerCase() + string.slice(1) : '';
      const answerCompare = (answer: string, userAnswer: string): boolean =>
        lowercaseFirstLetter(answer) === lowercaseFirstLetter(userAnswer);
      const exercise = await this.getContent(assignment.content._id);
      for (let i = 0; i < exercise.correctAnswer?.length; i++) {
        status.push({
          correct: answerCompare(
            assignment.content?.detail?.questionArray[i].answer?.trim() || '',
            exercise.correctAnswer[i].key?.trim() || '',
          ),
          correctAnswer: exercise.correctAnswer[i].key,
          answer:
            assignment.content?.detail?.questionArray[i].answer?.trim() || '',
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
