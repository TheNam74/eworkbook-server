import CreateWordsearchDto from './dtos/create-wordsearch.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as _ from 'lodash';
import { Wordsearch, WordsearchDocument } from './schemas/wordsearch.schema';

@Injectable()
export class WordsearchService {
  constructor(
    @InjectModel(Wordsearch.name)
    private readonly exerciseModel: Model<WordsearchDocument>,
  ) {}

  async createContent(
    exercise: CreateWordsearchDto,
  ): Promise<WordsearchDocument> {
    return await this.exerciseModel.create(exercise);
  }

  async updateContent(
    id: string,
    content: CreateWordsearchDto,
  ): Promise<WordsearchDocument> {
    return await this.exerciseModel.findByIdAndUpdate(id, content);
  }
  async deleteContent(id: string): Promise<void> {
    return await this.exerciseModel.findByIdAndDelete(id);
  }
  async getContent(id: string): Promise<WordsearchDocument> {
    return await this.exerciseModel.findById(id).exec();
  }
  async getStatus(assignment: any): Promise<any> {
    try {
      const status = [];
      const content = await this.getContent(assignment.content._id);
      const attemptedWord = assignment.content?.detail?.attemptedWord;
      if (!attemptedWord) throw new Error('Undefined attempted word');
      for (const pattern of content.detail.words) {
        status.push({
          correct: attemptedWord.includes(pattern.word),
          word: pattern.word,
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
