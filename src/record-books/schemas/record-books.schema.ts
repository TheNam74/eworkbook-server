import { Material } from '../../materials/schemas/material.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export type RecordBookDocument = RecordBook & Document;
// base schema which all Material types extend
@Schema()
export class RecordBook {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
  })
  material: Material;

  @Prop({
    type: String,
    required: true,
  })
  time: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: User;

  @Prop({
    type: Number,
    required: true,
  })
  numberOfLeafTotal: number;

  @Prop({
    type: Array,
    required: true,
  })
  LeafDone: Array<string>;

  @Prop({
    type: Array, // Array<Record>
  })
  children: Array<any>;
}

export const RecordBookSchema = SchemaFactory.createForClass(RecordBook);
