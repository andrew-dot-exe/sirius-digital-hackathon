import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'The login username or email' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ description: 'The password for the user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
