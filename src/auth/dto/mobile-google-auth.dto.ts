import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class MobileGoogleAuthDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Access Token' })
  accessToken: string;
}
