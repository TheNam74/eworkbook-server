import { MaterialsService } from '../materials/materials.service';
import { VotingService } from './voting/voting.service';
import { Rating, RatingDocument } from './schema/rating.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { CreateVotingDto } from './voting/dtos/create-voting.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<RatingDocument>,

    private votingService: VotingService,

    private materialService: MaterialsService,
  ) {}

  async createRating(rating: CreateRatingDto): Promise<any> {
    const newRating = new this.ratingModel(rating);
    await newRating.save();
    const ratingCount = await this.materialService.getRatingCount(
      rating.materialId,
    );
    const ratingStarAverage = await this.materialService.getRatingStarAverage(
      rating.materialId,
    );
    const addedStar = rating.content.star as number;
    const newRatingStarAverage =
      (ratingStarAverage * ratingCount + addedStar) / (ratingCount + 1);
    await this.materialService.updateRatingStartAverage(
      rating.materialId,
      newRatingStarAverage,
    );
    await this.materialService.increaseRatingCount(rating.materialId);
    return newRating;
  }

  async getRatings(filter): Promise<any> {
    return await this.ratingModel
      .find(filter)
      .populate('userId')
      .populate('materialId');
  }

  async getRatingByMaterialIDAndPaging(filter): Promise<any> {
    const skip = filter.pageSize * filter.page - filter.pageSize;
    const limit = filter.pageSize;
    if (!('content.star' in filter)) {
      return await this.ratingModel
        .find({ materialId: filter.materialId })
        .sort({ createdDate: -1 })
        .populate('userId')
        .populate('materialId')
        .skip(skip)
        .limit(limit);
    }
    let changeToInt;
    if (Array.isArray(filter['content.star'])) {
      changeToInt = filter['content.star'].map((item) => Number(item));
    } else {
      changeToInt = Number(filter['content.star']);
    }
    return await this.ratingModel
      .find({ materialId: filter.materialId, 'content.star': changeToInt })
      .sort({ createdDate: -1 })
      .populate('userId')
      .populate('materialId')
      .skip(skip)
      .limit(limit);
  }

  async getSingleRating(filter): Promise<any> {
    return await this.ratingModel
      .findOne(filter)
      .populate('userId')
      .populate('materialId');
  }

  async createVoting(voting: CreateVotingDto): Promise<any> {
    const lastestVoting = await this.votingService.getSingleVoting({
      userId: voting.userId,
      ratingId: voting.ratingId,
    });
    if (lastestVoting == null) {
      if (voting.type == 'Like') this.upVote(voting.ratingId);
      else this.downVote(voting.ratingId);
    } else {
      if (lastestVoting.type === voting.type) {
        return null;
      }
      if (lastestVoting.type === 'Like') {
        this.deleteUpVote(lastestVoting);
        this.downVote(voting.ratingId);
      } else {
        this.deleteDownVote(lastestVoting);
        this.upVote(voting.ratingId);
      }
    }
    return this.votingService.createVoting(voting);
  }

  async upVote(ratingId): Promise<any> {
    const upVoteRating = await this.ratingModel.findOneAndUpdate(
      { _id: ratingId },
      { $inc: { upVote: 1 } },
    );
    return upVoteRating;
  }

  async downVote(ratingId): Promise<any> {
    const downVoteRating = await this.ratingModel.findOneAndUpdate(
      { _id: ratingId },
      { $inc: { downVote: 1 } },
    );
    return downVoteRating;
  }

  async deleteUpVote(deletedVote): Promise<any> {
    const upVoteRating = await this.ratingModel.findOneAndUpdate(
      { _id: deletedVote.ratingId },
      { $inc: { upVote: -1 } },
    );
    await this.votingService.deleteVotingById(deletedVote._id);
    return upVoteRating;
  }

  async deleteDownVote(deletedVote): Promise<any> {
    const downVoteRating = await this.ratingModel.findOneAndUpdate(
      { _id: deletedVote.ratingId },
      { $inc: { downVote: -1 } },
    );
    await this.votingService.deleteVotingById(deletedVote.id);
    return downVoteRating;
  }

  async getStarRatio(filter): Promise<any> {
    if (filter.materialId === 'undefined') return 0;
    const allRating = await this.ratingModel
      .find({ materialId: filter.materialId })
      .count();
    if (allRating === 0) return 0;
    const starAsNumber = parseInt(filter.starValue);
    const starValueNumber = await this.ratingModel
      .find({ materialId: filter.materialId, 'content.star': starAsNumber })
      .count();
    return (starValueNumber * 100) / allRating;
  }

  async updateRating(newRatingData: any): Promise<any> {
    const oldRating = await this.ratingModel.findOneAndUpdate(
      { _id: newRatingData._id },
      { content: newRatingData.content },
    );
    if (oldRating.content.star !== newRatingData.content.star) {
      const ratingCount = await this.materialService.getRatingCount(
        newRatingData.materialId,
      );
      const ratingStarAverage = await this.materialService.getRatingStarAverage(
        newRatingData.materialId,
      );
      const deviantStar = (newRatingData.content.star -
        (oldRating.content.star as number)) as number;
      const newRatingStarAverage =
        (ratingStarAverage * ratingCount + deviantStar) / ratingCount;
      await this.materialService.updateRatingStartAverage(
        newRatingData.materialId,
        newRatingStarAverage,
      );
    }
    return await this.ratingModel
      .findOne({ _id: newRatingData._id })
      .populate('userId')
      .populate('materialId');
  }
}
