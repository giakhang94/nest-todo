import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as ms from 'ms';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async loginUser(user: User, res: Response) {
    const payload = { userId: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    const expireTime = parseInt(
      this.configService.get<string>('JWT_EXP') as any,
    );
    const duration = expireTime * 60 * 60 * 1000;
    res.cookie('Authentication', token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + duration),
    });
    return { message: 'Login successfully' };
  }

  async logoutUser(res: Response) {
    res.cookie('Authentication', '', {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 1),
    });
    return { message: 'Logout!' };
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      throw new BadRequestException('email or password is not correct');
    }
    return user;
  }
}
