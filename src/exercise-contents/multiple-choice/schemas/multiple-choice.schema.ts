import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MultipleChoiceDocument = MultipleChoice & Document;
@Schema()
export class MultipleChoice {
  @Prop({ required: true })
  detail: [
    {
      id: string;
      questionText: string;
      questionImg: string;
      answers: { answerText: string; answerImg: string }[];
    },
  ];
  @Prop({ required: true })
  correctAnswer: [[number]];
}

export const MultipleChoiceSchema =
  SchemaFactory.createForClass(MultipleChoice);
