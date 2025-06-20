import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetCurrentUser } from 'src/auth/decorators/GetCurrentUser.decorator';
import { PayloadToken } from 'src/auth/types';
import { UserResponseDto } from './dtos/user-response.dto';
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
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'email has been already used' })
  createUser(@Body() body: CreateUserDto) {
    return instanceToPlain(this.usersService.createUser(body));
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@GetCurrentUser() user: PayloadToken) {
    return instanceToPlain(
      this.usersService.getCurrentUser(Number(user.userId)),
    );
  }
}
