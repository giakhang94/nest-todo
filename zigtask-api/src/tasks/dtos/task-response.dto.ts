import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../types';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

export class TaskResponseDto {
  @ApiProperty({ example: 'blockchain course' })
  title: string;

  @IsOptional()
  @ApiProperty({
    example: 'learn how to build blockchain and crypto currency on udemy',
  })
  description?: string;

  @ApiProperty({ example: '06/30/2025' })
  due: Date;

  @IsEnum(TaskStatus)
  @IsOptional()
  @Transform(({ value }) => value ?? TaskStatus.todo)
  @ApiProperty({ example: 'To Do' })
  status?: TaskStatus;

  @ApiProperty({ example: { id: 1 } })
  user: User;
}
