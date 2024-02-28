import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @ApiProperty({ type: String, description: 'exerciseType' })
  exerciseType: string;

  @IsString()
  @ApiProperty({ type: String, description: 'title' })
  title: string;

  @IsString()
  @ApiProperty({ type: String, description: 'parentMaterial' })
  parentMaterial: string;

  @IsObject()
  @ApiProperty({ type: Object, description: 'content' })
  content: unknown;

  @ApiProperty({ type: 'array', description: 'correctAnswer' })
  correctAnswer: unknown;
}
