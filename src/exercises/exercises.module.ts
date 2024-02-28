import { MaterialsModule } from './../materials/materials.module';
import { RecordsModule } from './../records/records.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseServiceFactory, ExercisesService } from './exercises.service';
import { Exercise, ExerciseSchema } from './schemas/exercise.schema';
import { ExercisesController } from './exercises.controller';
import { ExerciseContentsModule } from '../exercise-contents/exercise-contents.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Exercise.name,
        schema: ExerciseSchema,
      },
    ]),
    ExerciseContentsModule,
    RecordsModule,
    forwardRef(() => MaterialsModule),
  ],
  providers: [ExercisesService, ExerciseServiceFactory],
  controllers: [ExercisesController],
  exports: [ExercisesService],
})
export class ExercisesModule {}
