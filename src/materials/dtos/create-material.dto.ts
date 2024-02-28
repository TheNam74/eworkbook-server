import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber, IsInt } from 'class-validator';

export class CreateMaterialDto {
  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @IsString()
  @ApiProperty({ type: String, description: 'type' })
  type: string;

  @IsString()
  @ApiProperty({ type: String, description: 'CEFR' })
  CEFR: string;

  @IsString()
  @ApiProperty({ type: String, description: 'description' })
  description: string;

  @IsString()
  @ApiProperty({ type: String, description: 'coverImg' })
  coverImg: string;

  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'isLeaf' })
  isLeaf: boolean;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'depthLevel' })
  depthLevel: number;

  @ApiProperty({ description: 'author' })
  author: string;

  @ApiProperty({ description: 'timeCreate' })
  timeCreate: Date;

  @ApiProperty({ description: 'status' })
  status: string;

  @ApiProperty({ description: 'redoTimes' })
  redoTimes: string;

  @ApiProperty({ description: 'canReview' })
  canReview: boolean;

  @ApiProperty({ description: 'publicScore' })
  publicScore: string;

  @ApiProperty({ description: 'limitTime' })
  limitTime: string;

  @ApiProperty({ description: 'isLimitTime' })
  isLimitTime: boolean;

  @ApiProperty({ description: 'isPublicForOtherTeacher' })
  isPublicForOtherTeacher: boolean;
}
