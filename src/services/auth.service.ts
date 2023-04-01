import { Inject, Injectable } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { Session } from 'src/models/session.model';

@Injectable()
export class AuthService {
  session: Session;
  constructor(@Inject(CONTEXT) context) {
    if (!context && !context.session) {
      return;
    }
    this.session = context.session;
  }
}
