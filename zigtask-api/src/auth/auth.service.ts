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
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async loginUser(user: User, res: Response) {
    console.log(user);
    return 1;
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
