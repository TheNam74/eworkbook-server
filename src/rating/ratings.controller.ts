import { VotingService } from './voting/voting.service';
import { Voting } from './voting/schema/voting.schema';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { CreateVotingDto } from './voting/dtos/create-voting.dto';
import { RatingsService } from './ratings.service';
import { Rating } from './schema/rating.schema';

@Controller('ratings')
@ApiTags('Rating')
export class RatingsController {
  constructor(
    private ratingsService: RatingsService,
    private votingService: VotingService,
  ) {}

  @Post()
  @ApiBody({ type: CreateRatingDto })
  createRating(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    return this.ratingsService.createRating(createRatingDto);
  }

  @Get()
  getRatings(@Query() filter: any): Promise<Rating[]> {
    return this.ratingsService.getRatings(filter);
  }
  @Get('/single')
  getSingleRatings(@Query() filter: any): Promise<Rating> {
    return this.ratingsService.getSingleRating(filter);
  }

  @Post('/voting')
  createVoting(@Body() createVotingDto: CreateVotingDto): Promise<Voting> {
    return this.ratingsService.createVoting(createVotingDto);
  }

  @Get('/voting')
  getVoting(@Query() filter: any): Promise<Voting[]> {
    return this.votingService.getVoting(filter);
  }

  @Get('/singleVoting')
  getSingleVoting(@Query() filter: any): Promise<Voting[]> {
    return this.votingService.getSingleVoting(filter);
  }

  @Get('/ratio')
  getStarRatio(@Query() filter: any): Promise<number> {
    return this.ratingsService.getStarRatio(filter);
  }

  @Get('/paging')
  getRatingByMaterial(@Query() filter: any): Promise<Rating[]> {
    return this.ratingsService.getRatingByMaterialIDAndPaging(filter);
  }
  @Patch('/update')
  @ApiBody({ type: CreateRatingDto })
  updateRating(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.updateRating(createRatingDto);
  }
}
