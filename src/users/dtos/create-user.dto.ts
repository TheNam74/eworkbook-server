import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ type: String, description: 'firstName' })
  firstName: string;

  @IsString()
  @ApiProperty({ type: String, description: 'lastName' })
  lastName: string;

  @IsString()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsString()
  @ApiProperty({ type: String, description: 'avatar' })
  avatar?: string;

  @IsString()
  @ApiProperty({ type: String, description: 'gender' })
  gender?: string;

  @IsString()
  @ApiProperty({ type: String, description: 'phone' })
  phone?: string;

  @IsString()
  @ApiProperty({ type: Date, description: 'DOB' })
  DOB?: Date;

  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'isLock' })
  isLock?: boolean;

  @IsString()
  @ApiProperty({ type: String, description: 'role' })
  role: string;

  @IsString()
  @ApiProperty({ type: String, description: 'grade' })
  grade?: string;

  @IsString()
  @ApiProperty({ type: String, description: 'academicLevel' })
  academicLevel?: string;
}
