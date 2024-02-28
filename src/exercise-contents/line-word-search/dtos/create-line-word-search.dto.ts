import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

class LineWordSearchDetailDto{

  @IsString()
  @ApiProperty({type: String, description: 'questionId'})
  questionId: string;

  @IsString()
  @ApiProperty({type: String, description: 'findWord'})
  findWord: string;

  @IsString()
  @ApiProperty({type: String, description: 'content'})
  content: string;

  @IsString()
  @ApiProperty({type: String, description: 'image'})
  image: string;
}

class LineWordSearchCorrectAnswerDto{
  @IsString()
  @ApiProperty({type: String, description: 'questionId'})
  questionId: string;
  
  @IsNumber()
  @ApiProperty({type: Number, description: 'position'})
  position: number;

  @IsString()
  @ApiProperty({type: Number, description: 'length'})
  length: number;
}

export class CreateLineWordSearchDto {
  @ApiProperty({ type: [LineWordSearchDetailDto], description: 'detail' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LineWordSearchDetailDto)
  detail: LineWordSearchDetailDto[];

  @ApiProperty({ type: [LineWordSearchCorrectAnswerDto], description: 'correctAnswer' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LineWordSearchCorrectAnswerDto)
  correctAnswer: LineWordSearchCorrectAnswerDto[];
}