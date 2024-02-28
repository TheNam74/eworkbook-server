import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateExerciseDto } from './create-exercise.dto';

export class UpdateExerciseDto extends CreateExerciseDto {
  @IsString()
  @ApiProperty({ type: String, description: '_id' })
  _id?: string;
}
