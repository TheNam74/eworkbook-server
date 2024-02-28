import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PicDragAndDrop,
  PicDragAndDropSchema,
} from './schemas/pic-drag-and-drop.schema';
import { PicDragAndDropService } from './pic-drag-and-drop.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PicDragAndDrop.name,
        schema: PicDragAndDropSchema,
      },
    ]),
  ],
  providers: [PicDragAndDropService],
  exports: [
    MongooseModule.forFeature([
      {
        name: PicDragAndDrop.name,
        schema: PicDragAndDropSchema,
      },
    ]),
    PicDragAndDropService,
  ],
})
export class PicDragAndDropModule {}
