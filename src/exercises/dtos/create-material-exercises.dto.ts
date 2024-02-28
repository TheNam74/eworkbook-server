import { ApiProperty } from '@nestjs/swagger';
import { CreateExerciseDto } from './create-exercise.dto';

export class CreateMaterialExercisesDto {
  @ApiProperty({ type: [CreateExerciseDto], description: 'CreateExerciseDto' })
  createExerciseDtos: [CreateExerciseDto];
}
