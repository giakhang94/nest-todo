import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/auth/types';

export class UserResponseDto {
  @ApiProperty({ example: 'Khang' })
  firstName: string;

  @ApiProperty({ example: 'Nguyễn' })
  lastName: string;

  @ApiProperty({ example: 'khang@test.com' })
  email: string;

  @ApiProperty({ enum: Role, example: Role.User })
  @IsEnum(Role, { message: 'role must either admin or user' })
  role: Role;
}
