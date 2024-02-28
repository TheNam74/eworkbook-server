import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MakeSentenceService } from './make-sentence.service';
import {
  MakeSentence,
  MakeSentenceSchema,
} from './schemas/make-sentence.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MakeSentence.name,
        schema: MakeSentenceSchema,
      },
    ]),
  ],
  providers: [MakeSentenceService],
  exports: [
    MakeSentenceService,
    MongooseModule.forFeature([
      {
        name: MakeSentence.name,
        schema: MakeSentenceSchema,
      },
    ]),
  ],
})
export class MakeSentenceModule {}
