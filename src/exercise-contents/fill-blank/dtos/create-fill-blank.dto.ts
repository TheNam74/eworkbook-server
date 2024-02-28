import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class FillBlankQuestionDto {
  @IsString()
  @ApiProperty({ type: String, description: 'questionText' })
  questionId: string;

  @IsString()
  @ApiProperty({ type: String, description: 'questionText' })
  questionText: string;

  @IsString()
  @ApiProperty({ type: String, description: 'questionImg' })
  questionImg: string;
}
class FillBlankDetailDto {
  @IsString()
  @ApiProperty({ type: String, description: 'mainText' })
  mainText: string;

  @IsString()
  @ApiProperty({ type: String, description: 'mainImg' })
  mainImg: string;

  @ValidateNested({ each: true })
  @Type(() => FillBlankQuestionDto)
  questionArray: FillBlankQuestionDto[];
}
class FillBlankKeyDto {
  @IsString()
  @ApiProperty({ type: String, description: 'quesionId' })
  quesionId: string;

  @IsString()
  @ApiProperty({ type: String, description: 'key' })
  key: string;
}

export class CreateFillBlankDto {
  @ApiProperty({ type: FillBlankDetailDto, description: 'detail' })
  detail: FillBlankDetailDto;

  @ApiProperty({ type: [FillBlankKeyDto], description: 'correctAnswer' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FillBlankKeyDto)
  correctAnswer: FillBlankKeyDto[];
}
