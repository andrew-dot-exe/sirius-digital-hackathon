import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ description: 'Full name of the user' })
  @IsString()
  @IsNotEmpty()
  fio: string;

  @ApiProperty({
    description: 'Unique login for the user',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongPassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string; // Передается в открытом виде, затем будет хешироваться

  @ApiProperty({ description: 'ID of the user level', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userLevelId: number;
}
