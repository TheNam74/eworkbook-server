import { RatingsModule } from './../ratings.module';
import { VotingService } from './voting.service';
import { Voting, VotingSchema, VotingDocument } from './schema/voting.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Voting.name,
        schema: VotingSchema,
      },
    ]),
  ],
  providers: [VotingService],
  exports: [VotingService],
})
export class VotingModule {}
