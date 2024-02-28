import { MaterialsModule } from './../materials/materials.module';
import { RecordBook, RecordBookSchema } from './schemas/record-books.schema';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordBooksService } from './record-books.service';
import { RecordBooksController } from './record-books.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RecordBook.name,
        schema: RecordBookSchema,
      },
    ]),
    forwardRef(() => MaterialsModule),
  ],
  providers: [RecordBooksService],
  exports: [RecordBooksService],
  controllers: [RecordBooksController],
})
export class RecordBooksModule {}
