import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInput } from './inputs/user.input';
import { User } from './models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  find(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(input: UserInput): Promise<User> {
    const { username } = input;
    const userExists = await this.usersRepository.findOne({
      where: { username },
    });

    if (userExists) {
      throw Error('User already exists');
    }

    const user = this.usersRepository.create(input);
    return this.usersRepository.save(user);
  }
}
