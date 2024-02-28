import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateRecordBookDto {
  @IsString()
  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @ApiProperty({ description: 'material' })
  material: any;

  @Type(() => Date)
  @ApiProperty({ type: Date, description: 'time' })
  time: Date;

  @IsString()
  @ApiProperty({ type: String, description: 'userId' })
  userId: string;

  @IsNumber()
  @ApiProperty({ description: 'numberOfLeafTotal', type: Number })
  numberOfLeafTotal: number;

  @IsNumber()
  @ApiProperty({ description: 'LeafDone', type: Array })
  LeafDone: Array<string>;

  @ApiProperty({ type: 'array', description: 'children' })
  children: unknown;
}
