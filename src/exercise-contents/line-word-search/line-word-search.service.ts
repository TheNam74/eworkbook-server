import { LineWordSearch, LineWordSearchDocument } from './schemas/line-word-search.schema';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { CreateLineWordSearchDto } from './dtos/create-line-word-search.dto';
import * as _ from 'lodash';

@Injectable()
export class LineWordSearchService{
  constructor(
    @InjectModel(LineWordSearch.name)
    private readonly exerciseModel:
    Model<LineWordSearchDocument>
  ){}

  async createContent(exercise: CreateLineWordSearchDto): Promise<LineWordSearchDocument>{
    return await this.exerciseModel.create(exercise);
  }

  async updateContent(
    id: string,
    content: CreateLineWordSearchDto,
  ): Promise<LineWordSearchDocument>{
    return await this.exerciseModel.findByIdAndUpdate(id, content);
  }

  async deleteContent(id: string): Promise<void> {
    return await this.exerciseModel.findByIdAndDelete(id);
  }

  async getContent(id: string): Promise<LineWordSearchDocument> {
    return await this.exerciseModel.findById(id).exec();
  }

  async getStatus(assignment: any): Promise<any>{
    try{
      const status = [];
      const exercise= await this.getContent(assignment.content._id);
      const userAnswer=assignment.content.detail.answers;
      for (let i = 0; i < exercise.correctAnswer?.length; i++) {
        let isMatch=false;
        for(let j = 0; j < userAnswer?.length; j++)
        {
          if(exercise.correctAnswer[i].questionId===userAnswer[j].questionId)
          {
            isMatch=true;
            status.push({
              correct: _.isEqual(exercise.correctAnswer[i],userAnswer[j]),
              correctAnswer: exercise.correctAnswer[i],
              answer: userAnswer[j]
            });
            break;
          }
        }
        if(isMatch===false)
        {
          status.push({
            correct: false,
            correctAnswer: exercise.correctAnswer[i],
          });
        }
      }
      return{
        exerciseId: assignment._id,
        contentId: exercise._id,
        detail: exercise.detail,
        status
      }
    }catch(error){
      throw new Error(error);
    }
  }
}