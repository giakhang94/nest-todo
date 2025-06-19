import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { TaskStatus } from '../types';

export class CreateTaskDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  description?: string;

  @IsNotEmpty()
  due: Date;

  @IsNotEmpty()
  status: TaskStatus;
}
