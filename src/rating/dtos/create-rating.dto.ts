import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';

class RatingContent {
  @IsString()
  @ApiProperty({ type: String, description: 'ratingText' })
  ratingText: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'star' })
  star: number;
}

export class CreateRatingDto {
  @IsString()
  @ApiProperty({ type: String, description: 'id' })
  id: string;

  @IsString()
  @ApiProperty({ type: String, description: 'materialId' })
  materialId: string;

  @IsString()
  @ApiProperty({ type: String, description: 'userId' })
  userId: string;

  @IsDate()
  @ApiProperty({ type: String, description: 'createdDate' })
  createdDate: Date;

  @ApiProperty({ type: RatingContent, description: 'content' })
  content: RatingContent;

  @IsNumber()
  @ApiProperty({ type: Number, default: 0, description: 'upVote' })
  upVote: number;

  @IsNumber()
  @ApiProperty({ type: Number, default: 0, description: 'downVote' })
  downVote: number;
}
