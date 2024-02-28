import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SortService } from './sort.service';
import { Sort, SortSchema } from './schemas/sort.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Sort.name,
        schema: SortSchema,
      },
    ]),
  ],
  providers: [SortService],
  exports: [
    SortService,
    MongooseModule.forFeature([
      {
        name: Sort.name,
        schema: SortSchema,
      },
    ]),
  ],
})
export class SortModule {}
