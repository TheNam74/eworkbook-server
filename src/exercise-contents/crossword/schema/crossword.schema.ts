import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CrosswordDocument = Crossword & Document;

class CrosswordDetail {
  answer: string;
  clue: string;
  orientation: string;
  position: number[];
}
@Schema()
export class Crossword {
  @Prop({ type: Array, required: true })
  detail: CrosswordDetail[];
  @Prop({ type: Array, required: true })
  correctAnswer: CrosswordDetail[];
}

export const CrosswordSchema = SchemaFactory.createForClass(Crossword);
