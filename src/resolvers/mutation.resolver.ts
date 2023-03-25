import { GqlAuthGuard } from '../guards/graphql.guard';
import { Args, Mutation, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { createSessionArgs, CreateUserArgs } from 'src/common/argsTypes';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { Session } from 'src/models/session.model';
import { SessionService } from 'src/services/session.service';

@UseGuards(new GqlAuthGuard())
export class MutationResolver {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args() args: CreateUserArgs) {
    return await this.userService.createUser(args);
  }

  @Mutation(() => Session)
  async createSession(@Args() args: createSessionArgs) {
    return await this.sessionService.createNewSession(args.email);
  }
}
