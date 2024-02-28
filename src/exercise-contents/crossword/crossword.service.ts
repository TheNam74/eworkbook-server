import { Crossword, CrosswordDocument } from './schema/crossword.schema';
import { Injectable } from '@nestjs/common';
import { CreateCrosswordDto } from './dtos/create-crossword.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CrosswordService {
  constructor(
    @InjectModel(Crossword.name)
    private readonly exerciseModel: Model<CrosswordDocument>,
  ) {}

  async createContent(
    exercise: CreateCrosswordDto,
  ): Promise<CrosswordDocument> {
    return await this.exerciseModel.create(exercise);
  }
  async updateContent(
    id: string,
    content: CreateCrosswordDto,
  ): Promise<CrosswordDocument> {
    return await this.exerciseModel.findByIdAndUpdate(id, content);
  }
  async deleteContent(id: string): Promise<void> {
    return await this.exerciseModel.findByIdAndDelete(id);
  }
  async getContent(id: string): Promise<CrosswordDocument> {
    return await this.exerciseModel.findById(id).exec();
  }
  async getStatus(assignment: any): Promise<any> {
    try {
      const status = [];
      const exercise = await this.getContent(assignment.content._id);
      const getValid = (arr, row, col) => {
        if (arr[row]) {
          if (arr[row][col]) {
            return arr[row][col];
          }
          return '-';
        }
        return '-';
      };

      const getWord = (row, col, word, orientation) => {
        let result = '';
        for (let i = 0; i < word.length; i++) {
          if (orientation === 'across') {
            result += getValid(assignment.content.detail.answer, row, col + i);
          } else {
            result += getValid(assignment.content.detail.answer, row + i, col);
          }
        }
        return result;
      };
      if (assignment.content.detail?.answer) {
        for (let i = 0; i < exercise.correctAnswer?.length; i++) {
          const userInput = getWord(
            exercise.correctAnswer[i].position[1] - 1,
            exercise.correctAnswer[i].position[0] - 1,
            exercise.correctAnswer[i].answer,
            exercise.correctAnswer[i].orientation,
          );
          status.push({
            correct:
              userInput === exercise.correctAnswer[i].answer?.toUpperCase(),
            correctAnswer: exercise.correctAnswer[i].answer?.toUpperCase(),
            answer: userInput,
          });
        }
      } else {
        for (let i = 0; i < exercise.correctAnswer?.length; i++) {
          status.push({
            correct: false,
            correctAnswer: exercise.correctAnswer[i].answer?.toUpperCase(),
            answer: '',
          });
        }
      }
      return {
        exerciseId: assignment._id,
        contentId: exercise._id,
        detail: exercise.correctAnswer,
        status,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
