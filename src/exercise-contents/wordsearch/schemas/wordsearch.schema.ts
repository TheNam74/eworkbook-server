import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WordsearchDocument = Wordsearch & Document;

class WordsearchDetail {
  grid: string[][];
  words: {
    word: string;
    start: { x: number; y: number };
    end: { x: number; y: number };
  }[];
}

@Schema()
export class Wordsearch {
  @Prop({ type: WordsearchDetail, required: true })
  detail: WordsearchDetail;
  @Prop({ type: Array, required: true })
  correctAnswer: string[];
}

export const WordsearchSchema = SchemaFactory.createForClass(Wordsearch);
