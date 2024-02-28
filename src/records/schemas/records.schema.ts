import { Material } from './../../materials/schemas/material.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type RecordDocument = Record & Document;
// base schema which all Material types extend
@Schema()
export class Record {
  @Prop({
    type: String,
    required: true,
  })
  time: Date;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  userId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
  })
  parent: Material;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
  })
  root: Material;

  @Prop({
    type: Number,
    required: true,
  })
  numberCorrect: number;

  @Prop({
    type: Number,
    required: true,
  })
  totalQuestion: number;

  @Prop({
    type: Array,
    required: true,
  })
  children: Array<RecordChild>;
}

export class RecordChild {
  userAnswer: any;
  exerciseId: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
