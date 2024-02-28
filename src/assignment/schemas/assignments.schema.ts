import { Material } from '../../materials/schemas/material.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';
import { Record } from 'src/records/schemas/records.schema';

export type AssignmentDocument = Assignment & Document;
// base schema which all Material types extend
@Schema({ timestamps: true })
export class Assignment {
  @Prop() createdAt?: Date;

  @Prop({
    type: String,
  })
  deadline: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  student: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  teacher: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
  })
  material: Material;

  @Prop({
    type: String,
    default: 'doing',
  })
  status: string;

  @Prop({
    type: Number,
    default: 999999,
  })
  redoTimes: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  canReview: boolean;

  @Prop({
    type: Boolean,
    default: true,
  })
  publicScore: boolean;

  @Prop({
    type: String,
  })
  limitTime: string;

  @Prop({
    type: Boolean,
  })
  isLimitTime: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Record',
  })
  record: Record;
}
export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
