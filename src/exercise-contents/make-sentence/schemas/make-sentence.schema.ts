import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MakeSentenceDocument = MakeSentence & Document;

@Schema()
export class MakeSentence {
  @Prop({ type: Array, required: true })
  detail: [
    {
      sentences: [
        {
          sentenceKey: number;
          contextImg: string;
          template: string;
          questions: [
            {
              questionKey: string;
              options: [
                {
                  key: number;
                  option: string;
                },
              ];
            },
          ];
        },
      ];
    },
  ];
  @Prop({ type: Array, required: true })
  correctAnswer: [
    {
      sentenceKey: number;
      answer: [{ questionKey: string; answerKey: number }];
    },
  ];
}

export const MakeSentenceSchema = SchemaFactory.createForClass(MakeSentence);
