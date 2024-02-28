import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ListeningDocument = Listening & Document;

class ListeningDetail {
  questionArray: {
    questionId: string;
    questionAudio: string;
  }[];

  answerArray: {
    answerId: string;
    answerImg: string;
    answerText: string;
  };
}

@Schema()
export class Listening {
  @Prop({ type: ListeningDetail, required: true })
  detail: ListeningDetail;

  @Prop({ required: true })
  correctAnswer: [{ questionId: string; answerId: string }];
}

export const ListeningSchema = SchemaFactory.createForClass(Listening);
