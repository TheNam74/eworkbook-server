import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateAssignmentDto {
  @Type(() => Date)
  @ApiProperty({ type: Date, description: 'deadline' })
  deadline: Date;

  @ApiProperty({ description: 'student' })
  student: string;

  @ApiProperty({ description: 'teacher' })
  teacher: string;

  @ApiProperty({ description: 'material' })
  material: any;

  @ApiProperty({ description: 'status' })
  status: string;

  @ApiProperty({ description: 'redoTimes' })
  redoTimes: string;

  @ApiProperty({ description: 'canReview' })
  canReview: boolean;

  @ApiProperty({ description: 'publicScore' })
  publicScore: string;

  @ApiProperty({ description: 'limitTime' })
  limitTime: string;

  @ApiProperty({ description: 'isLimitTime' })
  isLimitTime: boolean;

  @ApiProperty({ description: 'record' })
  record: string;
}

