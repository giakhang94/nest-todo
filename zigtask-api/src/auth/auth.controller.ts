import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { GetCurrentUser } from './decorators/GetCurrentUser.decorator';
import { User } from 'src/users/user.entity';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async loginUser(
    @GetCurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.loginUser(user, res);
  }
}
