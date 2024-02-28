import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MultipleChoiceService } from './multiple-choice.service';
import {
  MultipleChoice,
  MultipleChoiceSchema,
} from './schemas/multiple-choice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MultipleChoice.name,
        schema: MultipleChoiceSchema,
      },
    ]),
  ],
  providers: [MultipleChoiceService],
  exports: [
    MultipleChoiceService,
    MongooseModule.forFeature([
      {
        name: MultipleChoice.name,
        schema: MultipleChoiceSchema,
      },
    ]),
  ],
})
export class MultipleChoiceModule {}
