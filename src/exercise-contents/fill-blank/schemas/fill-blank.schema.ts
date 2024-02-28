import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FillBlankDocument = FillBlank & Document;

class FillBlankDetail {
  mainText: string;
  mainImg: string;
  questionArray: {
    questionId: string;
    questionText: string;
    questionImg: string;
  }[];
}

@Schema()
export class FillBlank {
  @Prop({ type: FillBlankDetail, required: true })
  detail: FillBlankDetail;

  @Prop({ required: true })
  correctAnswer: [{ quesionId: string; key: string }];
}

export const FillBlankSchema = SchemaFactory.createForClass(FillBlank);
