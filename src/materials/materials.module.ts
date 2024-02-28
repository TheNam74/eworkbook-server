import { ExercisesModule } from './../exercises/exercises.module';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialsService } from './materials.service';
import { Material, MaterialSchema } from './schemas/material.schema';
import { MaterialsController } from './materials.controller';
import { RecordBooksModule } from 'src/record-books/record-books.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Material.name,
        schema: MaterialSchema,
      },
    ]),
    forwardRef(() => ExercisesModule),
    RecordBooksModule,
  ],
  providers: [MaterialsService],
  controllers: [MaterialsController],
  exports: [MaterialsService],
})
export class MaterialsModule {}
