import { MaterialsModule } from './../materials/materials.module';
import { VotingModule } from './voting/voting.module';
import { RatingsController } from './ratings.controller';
import { Rating, RatingSchema } from './schema/rating.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingsService } from './ratings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rating.name,
        schema: RatingSchema,
      },
    ]),
    VotingModule,
    MaterialsModule,
  ],
  providers: [RatingsService],
  controllers: [RatingsController],
})
export class RatingsModule {}
