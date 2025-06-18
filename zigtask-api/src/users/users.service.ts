import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
  async getUserById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }
}
