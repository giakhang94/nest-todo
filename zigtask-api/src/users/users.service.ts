import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(body: CreateUserDto) {
    const user = await this.getUserByEmail(body.email);
    if (user) {
      throw new BadRequestException('email has already been used');
    }

    const hashedPassword = await bcrypt.hash(body.password, 8);
    const newUser = this.usersRepository.create({
      ...body,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
  async getUserById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async getCurrentUser(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
