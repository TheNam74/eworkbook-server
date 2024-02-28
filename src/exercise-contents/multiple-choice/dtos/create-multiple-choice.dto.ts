import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

class TextAndImageDto {
  @IsString()
  @ApiProperty({ type: String, description: 'text' })
  text: string;

  @IsString()
  @ApiProperty({ type: String, description: 'img' })
  img: string;
}
class QuestionMultipleChoiceDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @ApiProperty({ type: String, description: 'text' })
  questionText: string;

  @IsString()
  @ApiProperty({ type: String, description: 'img' })
  questionImg: string;

  @ValidateNested({ each: true })
  @Type(() => TextAndImageDto)
  answers: TextAndImageDto[];
}
export class CreateMultipleChoiceDto {
  @ValidateNested({ each: true })
  @Type(() => QuestionMultipleChoiceDto)
  detail: QuestionMultipleChoiceDto[];

  correctAnswer: [[number]];
}
