import { ApiProperty } from '@nestjs/swagger';

export class CreatePairDto {

  @ApiProperty({ description: 'teacher' })
  teacher: any;

  @ApiProperty({ description: 'student' })
  student: any;
}

