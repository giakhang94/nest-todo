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
    const expireTime = this.configService.get<string>('JWT_EXP') as any;
    const duration = ms(expireTime);
    res.cookie('Authentication', token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + duration),
    });
    return { message: 'Login successfully' };
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatchPassword = bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      throw new BadRequestException('email or password is not correct');
    }
    return user;
  }
}
