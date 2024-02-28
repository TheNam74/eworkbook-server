import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

class CrosswordDetailDto {
  @IsString()
  @ApiProperty({ type: String, description: 'answer' })
  answer: string;

  @IsString()
  @ApiProperty({ type: String, description: 'clue' })
  clue: string;

  @IsString()
  @ApiProperty({ type: String, description: 'orientation' })
  orientation: string;

  @IsArray()
  @ApiProperty({ type: String, description: 'position' })
  position: number[];
}

export class CreateCrosswordDto {
  @Prop({ type: Array, required: true })
  detail: CrosswordDetailDto[];
  @Prop({ type: Array, required: true })
  correctAnswer: CrosswordDetailDto[];
}
