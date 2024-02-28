import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetNextMaterialDto {
  @IsString()
  @ApiProperty({ type: String, description: 'root' })
  root: string;

  @IsString()
  @ApiProperty({ type: String, description: 'parent' })
  parent: string;

  @IsString()
  @ApiProperty({ type: String, description: 'current' })
  current: string;
}
