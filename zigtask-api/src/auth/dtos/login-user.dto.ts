import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'khang@test.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'MyStrongPassword@123' })
  password: string;
}
