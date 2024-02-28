import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePicDragAndDropDto } from './dtos/create-pic-drag-and-drop.dto';
import {
  PicDragAndDrop,
  PicDragAndDropDocument,
} from './schemas/pic-drag-and-drop.schema';

@Injectable()
export class PicDragAndDropService {
  constructor(
    @InjectModel(PicDragAndDrop.name)
    private readonly exerciseModel: Model<PicDragAndDropDocument>,
  ) {}

  async createContent(
    exercise: CreatePicDragAndDropDto,
  ): Promise<PicDragAndDropDocument> {
    return await this.exerciseModel.create(exercise);
  }
  async updateContent(
    id: string,
    content: CreatePicDragAndDropDto,
  ): Promise<PicDragAndDropDocument> {
    return await this.exerciseModel.findByIdAndUpdate(id, content);
  }
  async deleteContent(id: string): Promise<void> {
    return await this.exerciseModel.findByIdAndDelete(id);
  }
  async getContent(id: string): Promise<PicDragAndDropDocument> {
    return await this.exerciseModel.findById(id).exec();
  }
  async getStatus(assignment: any): Promise<any> {
    try {
      const status = [];
      const answerCompare = (
        answerContextId: number,
        userAnswerContextId: number,
      ): boolean => answerContextId === userAnswerContextId;
      const exercise = await this.getContent(assignment.content._id);
      for (let i = 0; i < exercise.correctAnswer?.length; i++) {
        console.log(exercise.correctAnswer.length);
        const isEqual = answerCompare(
          assignment.content?.detail?.coordinates[i].answer?.id,
          exercise.correctAnswer[i].coordinateId,
        );
        console.log(isEqual);
        status.push({
          correct: isEqual,
          correctAnswer: exercise.correctAnswer[i].key,
          answer: assignment.content?.detail?.coordinates[i].answer || '',
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

// @Injectable()
// export class DragAndDropService {
//   create(createDragAndDropDto: CreateDragAndDropDto) {
//     return 'This action adds a new dragAndDrop';
//   }

//   findAll() {
//     return `This action returns all dragAndDrop`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} dragAndDrop`;
//   }

//   update(id: number, updateDragAndDropDto: CreateDragAndDropDto) {
//     return `This action updates a #${id} dragAndDrop`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} dragAndDrop`;
//   }
// }
