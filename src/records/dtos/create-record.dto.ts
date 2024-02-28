import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateRecordDto {
  @Type(() => Date)
  @ApiProperty({ type: Date, description: 'time' })
  time: Date;

  @ApiProperty({ description: 'name' })
  name: string;

  @ApiProperty({ description: 'parent' })
  parent: any;

  @ApiProperty({ description: 'root' })
  root: any;

  @IsString()
  @ApiProperty({ type: String, description: 'userId' })
  userId: string;

  @IsNumber()
  @ApiProperty({ description: 'numberCorrect', type: Number })
  numberCorrect: number;

  @IsNumber()
  @ApiProperty({ description: 'totalQuestion', type: Number })
  totalQuestion: number;

  @ApiProperty({ description: 'children' })
  @Type(() => RecordChild)
  children: RecordChild[];
}
class RecordChild {
  @ApiProperty({ description: 'userAnswer' })
  userAnswer: any;

  @IsString()
  @ApiProperty({ type: String, description: 'exerciseId' })
  exerciseId: string;
}
