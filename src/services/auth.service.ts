import { Inject, Injectable } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';

export interface Auth {
  userId: string;
  name: string;
  email: string;
  context: any;
  cookie: string;
}

@Injectable()
export class AuthService {
  user: Auth;
  constructor(@Inject(CONTEXT) context) {
    const user = context?.user;
    if (!user) {
      return;
    }
    this.user = {
      userId: user.id,
      name: user.name,
      email: user.email,
      context: user.context,
      cookie: user.cookie,
    };
  }
}
