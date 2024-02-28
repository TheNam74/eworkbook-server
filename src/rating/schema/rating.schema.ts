import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type RatingDocument = Rating & Document;

class RatingContent {
  ratingText: string;
  star: number;
}

@Schema()
export class Rating {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Material' })
  materialId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: Date, default: Date.now() })
  createdDate: Date;

  @Prop({ type: RatingContent, required: true })
  content: RatingContent;

  @Prop({ type: Number, default: 0 })
  upVote: number;

  @Prop({ type: Number, default: 0 })
  downVote: number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
