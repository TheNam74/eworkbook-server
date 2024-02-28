import { User } from './../../users/schemas/users.schema';
import { Material } from '../../materials/schemas/material.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PairDocument = Pair & Document;
// base schema which all Material types extend
@Schema()
export class Pair {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  teacher: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  student: User;
}


export const PairSchema = SchemaFactory.createForClass(Pair);
