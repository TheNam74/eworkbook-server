import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class UnscrambleQuestionDto {
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
class UnscrambleDetailDto {
  @IsString()
  @ApiProperty({ type: String, description: 'mainText' })
  mainText: string;

  @IsString()
  @ApiProperty({ type: String, description: 'mainImg' })
  mainImg: string;

  @ValidateNested({ each: true })
  @Type(() => UnscrambleQuestionDto)
  questionArray: UnscrambleQuestionDto[];

  @ApiProperty({ type: Boolean, description: 'isCharacterScramble' })
  isCharacterScramble: boolean;
}
class UnscrambleKeyDto {
  @IsString()
  @ApiProperty({ type: String, description: 'quesionId' })
  quesionId: string;

  @IsString()
  @ApiProperty({ type: String, description: 'key' })
  key: string;
}

export class CreateUnscrambleDto {
  @ApiProperty({ type: UnscrambleDetailDto, description: 'detail' })
  detail: UnscrambleDetailDto;

  @ApiProperty({ type: [UnscrambleKeyDto], description: 'correctAnswer' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnscrambleKeyDto)
  correctAnswer: UnscrambleKeyDto[];
}
