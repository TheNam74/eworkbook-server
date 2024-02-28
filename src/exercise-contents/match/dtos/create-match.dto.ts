import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

class MatchColDataDto {
  @IsString()
  @ApiProperty({ type: String, description: 'id' })
  id: string;

  @IsString()
  @ApiProperty({ type: String, description: 'element' })
  element: string;
}

class MatchDataDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'colKey' })
  colKey: number;

  @ApiProperty({ type: [MatchColDataDto], description: 'colData' })
  @ValidateNested()
  @IsArray()
  @Type(() => MatchColDataDto)
  colData: MatchColDataDto[];
}

class MatchDetailDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'totalCol' })
  totalCol: number;

  @ApiProperty({ type: [MatchDataDto], description: 'data' })
  @ValidateNested({ each: true })
  @Type(() => MatchDataDto)
  data: MatchDataDto;
}

class MatchPairDto {
  @IsString()
  @ApiProperty({ type: String, description: 'first' })
  first: string;

  @IsString()
  @ApiProperty({ type: String, description: 'second' })
  second: string;
}

export class CreateMatchDto {
  //xem lai
  @ApiProperty({ type: MatchDetailDto, description: 'detail' })
  detail: MatchDetailDto;

  @ApiProperty({ type: [MatchPairDto], description: 'correctAnswer' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MatchPairDto)
  correctAnswer: MatchPairDto[];
}
