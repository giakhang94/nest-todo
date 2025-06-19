import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TaskStatus } from '../types';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  @ApiProperty({ example: 'blockchain course' })
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsOptional()
  @ApiProperty({
    example: 'learn how to build blockchain and crypto currency on udemy',
  })
  description?: string;

  @IsNotEmpty()
  @ApiProperty({ example: '06/30/2025' })
  due: Date;

  @IsEnum(TaskStatus)
  @IsOptional()
  @Transform(({ value }) => value ?? TaskStatus.todo)
  @ApiProperty({ example: 'To Do' })
  status?: TaskStatus;
}
