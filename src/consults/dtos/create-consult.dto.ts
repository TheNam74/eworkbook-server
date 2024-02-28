import { ApiProperty } from '@nestjs/swagger';

export default class CreateConsultDto {
  @ApiProperty({ type: String, description: 'teacher' })
  phone: string;

  @ApiProperty({ type: String, description: 'student' })
  email: string;
}
