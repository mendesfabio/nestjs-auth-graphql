import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './models/user.entity';
import { UsersService } from './users.service';
import { UserInput } from './inputs/user.input';

@Resolver('Users')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return this.usersService.find(id);
  }

  @Mutation(() => User)
  async createUser(@Args('data') input: UserInput): Promise<User> {
    return this.usersService.create(input);
  }
}
