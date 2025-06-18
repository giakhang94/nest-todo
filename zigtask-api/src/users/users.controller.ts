import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { instanceToPlain } from 'class-transformer';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user account with email, password, and role',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: CreateUserDto })
  @ApiBadRequestResponse({ description: 'email has been already used' })
  createUser(@Body() body: CreateUserDto) {
    return instanceToPlain(this.usersService.createUser(body));
  }
}
