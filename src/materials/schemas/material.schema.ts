import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MaterialDocument = Material & Document;
// base schema which all Material types extend
@Schema()
export class Material {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'materials',
  })
  content: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: Number,
  })
  depthLevel: number;

  @Prop({
    type: String,
  })
  CEFR: string;

  @Prop({
    type: Boolean,
  })
  isLeaf: boolean;

  @Prop({
    type: String,
  })
  coverImg: string;

  @Prop({
    type: String,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
  })
  type: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'materials' })
  parent: string;

  @Prop({
    type: Array,
    required: false,
  })
  children: Array<Material>;

  @Prop({
    type: Number,
    required: false,
  })
  totalStudents: number;

  @Prop({
    type: Array,
    required: false,
  })
  exercises: Array<string>;

  @Prop({
    type: Number,
    default: 0,
  })
  ratingCount: number;

  @Prop({
    type: Number,
    default: 0,
  })
  ratingStarAverage: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: string;

  @Prop({
    type: String,
    default: Date.now(),
  })
  timeCreate: Date;

  @Prop({
    type: String,
    default: "unlisted",
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
    type: Boolean,
    default: false,
  })
  isPublicForOtherTeacher: boolean;
}
export const MaterialSchema = SchemaFactory.createForClass(Material);
