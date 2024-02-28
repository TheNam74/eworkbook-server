import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConsultDocument = Consult & Document;
@Schema()
export class Consult {
  @Prop({
    type: String,
    required: true,
  })
  phone: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;
}

export const ConsultSchema = SchemaFactory.createForClass(Consult);
