import { LineWordSearchService } from './line-word-search.service';
import { LineWordSearch, LineWordSearchSchema } from './schemas/line-word-search.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LineWordSearch.name,
        schema: LineWordSearchSchema,
      },
    ]),
  ],
  providers: [LineWordSearchService],
  exports: [
    MongooseModule.forFeature([
      {
        name: LineWordSearch.name,
        schema: LineWordSearchSchema,
      },
    ]),
    LineWordSearchService,
  ],
})
export class LineWordSearchModule {}
