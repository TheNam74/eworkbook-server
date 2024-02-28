import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVotingDto {
  @IsString()
  @ApiProperty({ type: String, description: 'id' })
  id: string;

  @IsString()
  @ApiProperty({ type: String, description: 'userId' })
  userId: string;

  @IsString()
  @ApiProperty({ type: String, description: 'ratingId' })
  ratingId: string;

  @IsString()
  @ApiProperty({ type: String, description: 'type' })
  type: string;
}
