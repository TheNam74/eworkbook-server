import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type VotingDocument = Voting & Document;

@Schema()
export class Voting {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' })
  ratingId: string;

  @Prop({ type: String, required: true })
  type: string;
}

export const VotingSchema = SchemaFactory.createForClass(Voting);
