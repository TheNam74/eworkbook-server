import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateListeningDto } from './dtos/create-listening.dto';
import { Listening, ListeningDocument } from './schemas/listening.schema';

@Injectable()
export class ListeningService {
  constructor(
    @InjectModel(Listening.name)
    private readonly exerciseModel: Model<ListeningDocument>,
  ) {}

  async createContent(
    exercise: CreateListeningDto,
  ): Promise<ListeningDocument> {
    console.log("createeeeeeeeee",exercise)
    return await this.exerciseModel.create(exercise);
  }
  async updateContent(
    id: string,
    content: CreateListeningDto,
  ): Promise<ListeningDocument> {
    return await this.exerciseModel.findByIdAndUpdate(id, content);
  }
  async deleteContent(id: string): Promise<void> {
    return await this.exerciseModel.findByIdAndDelete(id);
  }
  async getContent(id: string): Promise<ListeningDocument> {
    return await this.exerciseModel.findById(id).exec();
  }
  async getStatus(assignment: any): Promise<any> {
    //Lấy correct answer để so sánh chấm điểm
    const exercise = await this.getContent(assignment.content._id);
    // exercise.correctAnswer

    const status = [];
    let index = 0;
    assignment.content.detail.questionArray.forEach((question) => {
      status.push({
        correct: question.questionId === question?.answer?.answerId,
        correctAnswer: exercise.detail.answerArray[index],
      });
      index++;
    });

    // const status=[{correct:false},{correct:true},{correct:true}]

    return {
      exerciseId: assignment._id,
      contentId: exercise._id,
      detail: exercise.detail,
      status,
    };

    // try {
    //   const status = [];
    //   const answerCompare = (
    //     answerContextId: number,
    //     userAnswerContextId: number,
    //   ): boolean => answerContextId === userAnswerContextId;
    //   const exercise = await this.getContent(assignment.content._id);
    //   for (let i = 0; i < exercise.correctAnswer?.length; i++) {
    //     const isEqual = answerCompare(
    //       assignment.content?.detail?.contextArray[i].answer?.id,
    //       exercise.correctAnswer[i].contextId,
    //     );
    //     status.push({
    //       correct: isEqual,
    //       correctAnswer: exercise.correctAnswer[i].key,
    //       answer: assignment.content?.detail?.contextArray[i].answer || '',
    //     });
    //   }
    //   return {
    //     exerciseId: assignment._id,
    //     contentId: exercise._id,
    //     detail: exercise.detail,
    //     status,
    //   };
    // } catch (error) {
    //   throw new Error(error);
    // }
  }
}
