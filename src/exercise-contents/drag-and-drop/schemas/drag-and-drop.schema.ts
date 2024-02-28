import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DragAndDropDocument = DragAndDrop & Document;

class DragAndDropDetail {
  mainContext: string;
  mainContextImg: string;
  contextArray: {
    contextId: string;
    context: string;
    contextImg: string;
  }[];

  givenWords: {
    id: string;
    word: string;
  };
}

@Schema()
export class DragAndDrop {
  @Prop({ type: DragAndDropDetail, required: true })
  detail: DragAndDropDetail;

  @Prop({ required: true })
  correctAnswer: [{ contextId: number; key: string }];
}

export const DragAndDropSchema = SchemaFactory.createForClass(DragAndDrop);
