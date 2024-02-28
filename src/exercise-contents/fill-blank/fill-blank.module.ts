import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FillBlank, FillBlankSchema } from './schemas/fill-blank.schema';
import { FillBlankService } from './fill-blank.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FillBlank.name,
        schema: FillBlankSchema,
      },
    ]),
  ],
  providers: [FillBlankService],
  exports: [
    MongooseModule.forFeature([
      {
        name: FillBlank.name,
        schema: FillBlankSchema,
      },
    ]),
    FillBlankService,
  ],
})
export class FillBlankModule {}
