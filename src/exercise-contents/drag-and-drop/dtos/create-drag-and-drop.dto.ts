import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class DragAndDropQuestionDto {
  @IsString()
  @ApiProperty({ type: String, description: 'contextId' })
  contextId: string;

  @IsString()
  @ApiProperty({ type: String, description: 'context' })
  context: string;

  @IsString()
  @ApiProperty({ type: String, description: 'contextImg' })
  contextImg: string;
}
class DragAndDropGivenWordDto {
  @IsString()
  @ApiProperty({ type: String, description: 'id' })
  id: string;

  @IsString()
  @ApiProperty({ type: String, description: 'word' })
  word: string;
}
class DragAndDropDetailDto {
  @IsArray()
  givenWords: string[];

  @ValidateNested({ each: true })
  @Type(() => DragAndDropQuestionDto)
  contextArray: DragAndDropQuestionDto[];
}
class DragAndDropKeyDto {
  @IsString()
  @ApiProperty({ type: String, description: 'contextId' })
  contextId: string;

  @IsString()
  @ApiProperty({ type: String, description: 'key' })
  key: string;
  // @ValidateNested({ each: true })
  // @Type(() => DragAndDropGivenWordDto)
  // givenWord: DragAndDropGivenWordDto[];
}

export class CreateDragAndDropDto {
  @ApiProperty({ type: DragAndDropDetailDto, description: 'detail' })
  detail: DragAndDropDetailDto;

  @ApiProperty({ type: [DragAndDropKeyDto], description: 'correctAnswer' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DragAndDropKeyDto)
  correctAnswer: DragAndDropKeyDto[];
}
