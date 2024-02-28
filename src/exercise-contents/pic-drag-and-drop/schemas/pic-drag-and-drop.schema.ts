import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PicDragAndDropDocument = PicDragAndDrop & Document;

class PicDragAndDropDetail {
  audio: string;
  mainImg: string;
  givenWords: {
    id: number;
    word: string;
  };
  coordinates: {
    top: number;
    left: number;
    id: number;
  }[];
}

@Schema()
export class PicDragAndDrop {
  @Prop({ type: PicDragAndDropDetail, required: true })
  detail: PicDragAndDropDetail;

  @Prop({ required: true })
  correctAnswer: [{ coordinateId: number; key: string }];
}

export const PicDragAndDropSchema =
  SchemaFactory.createForClass(PicDragAndDrop);
