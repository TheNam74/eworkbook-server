import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class WordsearchDetailDto {
  @ValidateNested({ each: true })
  @Type(() => Array<string>)
  @ApiProperty({ type: Array, description: 'grid' })
  grid: string[][];

  @ValidateNested({ each: true })
  @Type(() => String)
  @ApiProperty({ type: Array, description: 'words' })
  words: WordsearchElementDto[];
}
class WordsearchElementDto {
  @ApiProperty({ type: String, description: 'word' })
  word: string;

  @ApiProperty({ type: Object, description: 'start' })
  start: { x: number; y: number };

  @ApiProperty({ type: Object, description: 'end' })
  end: { x: number; y: number };
}

export default class CreateWordsearchDto {
  @Type(() => WordsearchDetailDto)
  detail: WordsearchDetailDto;

  @ApiProperty({ type: Array, description: 'correctAnswer' })
  correctAnswer: string[];
}
