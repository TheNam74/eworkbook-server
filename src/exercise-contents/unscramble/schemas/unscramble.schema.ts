import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UnscrambleDocument = Unscramble & Document;

class UnscrambleDetail {
  mainText: string;
  mainImg: string;
  questionArray: {
    questionId: string;
    questionText: string;
    questionImg: string;
  }[];
}

@Schema()
export class Unscramble {
  @Prop({ type: UnscrambleDetail, required: true })
  detail: UnscrambleDetail;

  @Prop({ required: true })
  correctAnswer: [{ quesionId: string; key: string }];
}

export const UnscrambleSchema = SchemaFactory.createForClass(Unscramble);
