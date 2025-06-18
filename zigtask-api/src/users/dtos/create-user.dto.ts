import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export enum Role {
  Admin = 'admin',
  User = 'user',
}

export class CreateUserDto {
  @ApiProperty({ example: 'Khang' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Nguyễn' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'khang@test.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Strongpassword123@', minLength: 8 })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: Role, example: Role.User })
  @IsEnum(Role, { message: 'role must either admin or user' })
  role: Role;
}
