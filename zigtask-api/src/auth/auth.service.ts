import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async verifyUser(body: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(body.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatchPassword = bcrypt.compare(body.password, user.password);
    if (!isMatchPassword) {
      throw new BadRequestException('email or password is not correct');
    }
    return user;
  }
}
