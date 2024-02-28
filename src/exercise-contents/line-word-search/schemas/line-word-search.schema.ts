import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type LineWordSearchDocument = LineWordSearch & Document;
class LineWordSearchDetail {
  questionId: string;
  findWord: string;
  content: string;
  image: string;
}
@Schema()
export class LineWordSearch{
  @Prop({type: Array, required: true})
  detail: LineWordSearchDetail[];

  @Prop({type: Array, required: true})
  correctAnswer: 
  {
    questionId: string,
    position: number,
    length: number,
  };
}
export const LineWordSearchSchema=SchemaFactory.createForClass(LineWordSearch)