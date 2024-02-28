import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WordsearchService } from './wordsearch.service';
import { Wordsearch, WordsearchSchema } from './schemas/wordsearch.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wordsearch.name,
        schema: WordsearchSchema,
      },
    ]),
  ],
  providers: [WordsearchService],
  exports: [
    WordsearchService,
    MongooseModule.forFeature([
      {
        name: Wordsearch.name,
        schema: WordsearchSchema,
      },
    ]),
  ],
})
export class WordsearchModule {}
