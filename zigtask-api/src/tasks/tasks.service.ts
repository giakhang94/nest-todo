import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { PayloadToken } from 'src/auth/types';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskStatus } from './types';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    private userService: UsersService,
  ) {}

  async createTask(body: CreateTaskDto, user: PayloadToken) {
    if (!user.userId) {
      throw new UnauthorizedException('Please login to continue');
    }
    const task = this.taskRepo.create({
      ...body,
      user: { id: user.userId } as User,
    });
    return this.taskRepo.save(task);
  }

  async updateTask(body: UpdateTaskDto, userId: number, taskId: number) {
    if (Object.keys(body).length === 0)
      throw new BadRequestException('Nothing to update');
    if (!userId) throw new UnauthorizedException('Please login to continue');
    if (!taskId) throw new BadRequestException('Please provide task id');
    const task = await this.taskRepo.findOne({
      where: { id: taskId },
      relations: { user: true },
    });
    if (!task) {
      throw new NotFoundException('task not found');
    }
    if (task.user.id !== userId)
      throw new ForbiddenException('You are not allowed to edit this task');
    Object.assign(task, body);
    const updatedTask = await this.taskRepo.save(task);
    return { ...updatedTask, user: { id: updatedTask.user.id } };
  }

  async deleteTask(taskId: number, user: PayloadToken) {
    const task = await this.taskRepo.findOneBy({ id: taskId });
    if (!task) {
      throw new NotFoundException('Task not found or had been deleted');
    }
    if (user.role !== 'admin' && task.user.id !== user.userId) {
      throw new ForbiddenException('You are not allowed to delete this task ');
    }
    await this.taskRepo.remove(task);
    return { message: 'task deleted' };
  }

  async getTask(userId: number) {
    if (!userId) {
      throw new UnauthorizedException('Please login to continue');
    }
    return this.taskRepo.find({ where: { user: { id: userId } } });
  }

  async getAllTaskByAdmin(user: PayloadToken) {
    if (user.role !== 'admin') {
      throw new ForbiddenException('You can not view other user task');
    }
    return this.taskRepo.find();
  }

  async updateTaskStatus(taskId: number, userId: number, status: TaskStatus) {
    if (!userId) throw new UnauthorizedException('Please login to continue');
    if (!taskId) throw new BadRequestException('Please provide task id');
    const task = await this.taskRepo.findOne({
      where: { id: taskId },
      relations: { user: true },
    });
    if (userId !== task?.user.id)
      throw new ForbiddenException(
        'You re not allow to change this task status',
      );
    if (status === task.status) {
      return { message: 'nothing changes' };
    }
    task.status = status;
    const updatedTask = await this.taskRepo.save(task);
    return { ...updatedTask, user: { id: updatedTask.user.id } };
  }
}
