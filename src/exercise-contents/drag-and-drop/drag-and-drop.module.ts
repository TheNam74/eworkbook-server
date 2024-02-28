import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DragAndDrop, DragAndDropSchema } from './schemas/drag-and-drop.schema';
import { DragAndDropService } from './drag-and-drop.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DragAndDrop.name,
        schema: DragAndDropSchema,
      },
    ]),
  ],
  providers: [DragAndDropService],
  exports: [
    MongooseModule.forFeature([
      {
        name: DragAndDrop.name,
        schema: DragAndDropSchema,
      },
    ]),
    DragAndDropService,
  ],
})
export class DragAndDropModule {}
