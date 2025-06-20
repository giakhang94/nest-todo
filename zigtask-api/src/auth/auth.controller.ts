import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { GetCurrentUser } from './decorators/GetCurrentUser.decorator';
import { User } from 'src/users/user.entity';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDto } from './dtos/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({
    summary: 'Login user',
    description:
      'login user by email and password. Send back Authentication token through response',
  })
  @ApiCreatedResponse({ example: { message: 'Login Successfully' } })
  @ApiNotFoundResponse({ example: { message: 'user not found' } })
  @ApiBadRequestResponse({
    example: { message: 'email or password is not correct' },
  })
  @UseGuards(LocalGuard)
  async loginUser(
    @Body() body: LoginUserDto,
    @GetCurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.loginUser(user, res);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiOkResponse({ example: { message: 'Logout!' } })
  logoutUser(@Res({ passthrough: true }) res: Response) {
    return this.authService.logoutUser(res);
  }
}
