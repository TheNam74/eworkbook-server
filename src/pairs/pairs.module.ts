import { Pair, PairSchema } from './schemas/pairs.schema';
import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
// import { PairsController } from './Pairs.controller';
import { PairsService } from './Pairs.service';
import { PairsController } from './Pairs.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pair.name,
        schema: PairSchema,
      },
    ]),
    UsersModule,
  ],
  // controllers: [PairsController],
  providers: [PairsService],
  exports: [PairsService],
  controllers: [PairsController],
})
export class PairsModule { }
