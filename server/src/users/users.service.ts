import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async getByUsername(username: string) {
    const user = await this.usersRepository.findOne({ username });
    if (user) {
      return user;
    }
    throw new HttpException('Username does not exist', HttpStatus.NOT_FOUND);
  }

  async create(userp: any) {
    const user = new User();
    user.username = userp.username;
    user.password = userp.password;
    user.email = userp.email;
    user.roles = userp.roles || [];
    return this.usersRepository.insert(user);
  }
}
