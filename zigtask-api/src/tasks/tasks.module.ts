import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [UsersModule, TypeOrmModule.forFeature([Task])],
})
export class TasksModule {}
