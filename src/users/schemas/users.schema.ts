import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document & { _id: string };

enum Role {
  STUDENT = 'Student',
  TEACHER = 'Teacher',
  ADMIN = 'Admin',
}
@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
  })
  firstName: string;
  @Prop({
    type: String,
    required: true,
  })
  lastName: string;
  @Prop({
    type: String,
    required: true,
  })
  email: string;
  @Prop({
    type: String,
    required: true,
  })
  password: string;
  @Prop({
    type: String,
    required: true,
  })
  avatar: string;
  @Prop({
    type: String,
  })
  gender: string;
  @Prop({
    type: String,
  })
  phone: string;
  @Prop({
    type: Date,
  })
  DOB: Date;
  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  isLock: boolean;
  @Prop({
    type: String,
    required: true,
    enum: Role,
  })
  role: string;
  @Prop({
    type: String,
  })
  grade: string;
  @Prop({
    type: String,
  })
  academicLevel: string;
  @Prop({
    type: String,
  })
  refreshToken: string;
  @Prop({
    type: String,
  })
  randomString: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
