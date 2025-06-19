import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetCurrentUser } from 'src/auth/decorators/GetCurrentUser.decorator';
import { PayloadToken } from 'src/auth/types';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TaskResponseDto } from './dtos/task-response.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { UpdateStatusDto } from './dtos/update-status.dto';
@ApiTags()
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiCreatedResponse({ type: TaskResponseDto })
  @ApiUnauthorizedResponse({
    description: 'please login to continue',
  })
  createTask(
    @Body() body: CreateTaskDto,
    @GetCurrentUser() user: PayloadToken,
  ) {
    return this.tasksService.createTask(body, user);
  }

  @Get('/')
  @UseGuards(JwtGuard)
  @ApiOkResponse({ type: CreateTaskDto, isArray: true })
  @ApiOperation({ summary: 'Get tasks by user' })
  @ApiUnauthorizedResponse({
    description: 'please login to continue',
  })
  getTaskByUser(@GetCurrentUser() user: PayloadToken) {
    return this.tasksService.getTask(Number(user.userId));
  }

  @Delete(':taskId')
  @UseGuards(JwtGuard)
  @ApiNoContentResponse({ description: 'task deleted' })
  @ApiOperation({ summary: 'Delete a task with provided id' })
  @ApiForbiddenResponse({
    description: 'You are not allowed to delete this task ',
  })
  deleteTask(
    @Param('taskId') taskId: string,
    @GetCurrentUser() user: PayloadToken,
  ) {
    return this.tasksService.deleteTask(Number(taskId), user);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'update a task with provided id' })
  @ApiOkResponse({
    description: 'Task updated successfully',
    type: CreateTaskDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid update data or missing task ID',
  })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiForbiddenResponse({ description: 'Not allowed to update this task' })
  @ApiNotFoundResponse({ description: 'Task not found' })
  updateTask(
    @Param('id') taskId: string,
    @Body() body: UpdateTaskDto,
    @GetCurrentUser() user: PayloadToken,
  ) {
    return this.tasksService.updateTask(
      body,
      Number(user.userId),
      Number(taskId),
    );
  }

  @Patch(':id/status')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'toggle task status' })
  @ApiBody({ type: UpdateStatusDto })
  //   @ApiBadRequestResponse({ description: 'nothing changes' })
  @ApiBadRequestResponse({
    description:
      'Bad Request. Possible reasons:\n- nothing changes\n- please provide task id',
  })
  @ApiOkResponse({ type: TaskResponseDto })
  @ApiForbiddenResponse({
    description: 'You are not allowed to update this task status',
  })
  updateStatus(
    @Param('id') taskId: string,
    @Body() status: UpdateStatusDto,
    @GetCurrentUser() user: PayloadToken,
  ) {
    return this.tasksService.updateTaskStatus(
      Number(taskId),
      Number(user.userId),
      status.status,
    );
  }
}
