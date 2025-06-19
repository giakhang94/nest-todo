import { IsEnum } from 'class-validator';
import { TaskStatus } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @ApiProperty({ example: TaskStatus.done, enum: TaskStatus })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
