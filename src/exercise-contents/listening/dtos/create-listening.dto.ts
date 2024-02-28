import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class ListeningQuestionDto {
  @IsString()
  @ApiProperty({ type: String, description: 'questionId' })
  questionId: string;

  @IsString()
  @ApiProperty({ type: String, description: 'questionAudio' })
  questionAudio: string;
}
class ListeningAnswerDto {
  @IsString()
  @ApiProperty({ type: String, description: 'answerId' })
  answerId: string;

  @IsString()
  @ApiProperty({ type: String, description: 'answerImg' })
  answerImg: string;

  @IsString()
  @ApiProperty({ type: String, description: 'answerText' })
  answerText: string;
}
class ListeningDetailDto {
  @IsArray()
  questionArray: ListeningAnswerDto[];

  @ValidateNested({ each: true })
  @Type(() => ListeningQuestionDto)
  answerArray: ListeningQuestionDto[];
}
class ListeningCorrectAnwserDto {
  @IsString()
  @ApiProperty({ type: String, description: 'questionId' })
  questionId: string;

  @IsString()
  @ApiProperty({ type: String, description: 'answerId' })
  answerId: string;
}

export class CreateListeningDto {
  @ApiProperty({ type: ListeningDetailDto, description: 'detail' })
  detail: ListeningDetailDto;

  @ApiProperty({
    type: [ListeningCorrectAnwserDto],
    description: 'correctAnswer',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListeningCorrectAnwserDto)
  correctAnswer: ListeningCorrectAnwserDto[];
}
