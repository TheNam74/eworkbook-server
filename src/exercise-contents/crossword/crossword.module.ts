import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CrosswordService } from './crossword.service';
import { Crossword, CrosswordSchema } from './schema/crossword.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Crossword.name,
        schema: CrosswordSchema,
      },
    ]),
  ],
  providers: [CrosswordService],
  exports: [
    MongooseModule.forFeature([
      {
        name: Crossword.name,
        schema: CrosswordSchema,
      },
    ]),
    CrosswordService,
  ],
})
export class CrosswordModule {}
