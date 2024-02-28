import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class PicDragAndDropCoordinateDto {
  @IsString()
  @ApiProperty({ type: Number, description: 'top' })
  top: number;

  @IsString()
  @ApiProperty({ type: Number, description: 'left' })
  left: number;

  @IsString()
  @ApiProperty({ type: Number, description: 'id' })
  id: number;
}
class PicDragAndDropGivenWordDto {
  @IsString()
  @ApiProperty({ type: Number, description: 'id' })
  id: number;

  @IsString()
  @ApiProperty({ type: String, description: 'word' })
  word: string;
}
class PicDragAndDropDetailDto {
  @ApiProperty({
    type: [PicDragAndDropGivenWordDto],
    description: 'givenWords',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PicDragAndDropGivenWordDto)
  givenWords: PicDragAndDropGivenWordDto[];

  @ApiProperty({
    type: [PicDragAndDropCoordinateDto],
    description: 'coordinates',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PicDragAndDropCoordinateDto)
  coordinates: PicDragAndDropCoordinateDto[];
}
class PicDragAndDropKeyDto {
  @IsString()
  @ApiProperty({ type: Number, description: 'coordinateId' })
  coordinateId: number;

  @IsString()
  @ApiProperty({ type: String, description: 'key' })
  key: string;
}

export class CreatePicDragAndDropDto {
  @ApiProperty({ type: PicDragAndDropDetailDto, description: 'detail' })
  detail: PicDragAndDropDetailDto;

  @ApiProperty({ type: [PicDragAndDropKeyDto], description: 'correctAnswer' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PicDragAndDropKeyDto)
  correctAnswer: PicDragAndDropKeyDto[];
}
