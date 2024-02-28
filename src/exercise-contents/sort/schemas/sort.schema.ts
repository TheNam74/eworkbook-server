import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SortDocument = Sort & Document;

class SortDetail {
  mainContent: string;
  questions: [
    {
      questionIndex: number;
      questionElements: [
        {
          elementImg: string;
          elementId: number;
        },
      ];
    },
  ];
}

@Schema()
export class Sort {
  @Prop({ type: SortDetail, required: true })
  detail: SortDetail;
  @Prop({ type: Array, required: true })
  correctAnswer: [{ questionIndex: number; key: number[] }];
}

export const SortSchema = SchemaFactory.createForClass(Sort);
