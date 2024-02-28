import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Unscramble, UnscrambleSchema } from './schemas/unscramble.schema';
import { UnscrambleService } from './unscramble.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Unscramble.name,
        schema: UnscrambleSchema,
      },
    ]),
  ],
  providers: [UnscrambleService],
  exports: [
    MongooseModule.forFeature([
      {
        name: Unscramble.name,
        schema: UnscrambleSchema,
      },
    ]),
    UnscrambleService,
  ],
})
export class UnscrambleModule {}
