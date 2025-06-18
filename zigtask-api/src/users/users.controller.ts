import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { instanceToPlain } from 'class-transformer';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  createUser(@Body() body: CreateUserDto) {
    return instanceToPlain(this.usersService.createUser(body));
  }
}
