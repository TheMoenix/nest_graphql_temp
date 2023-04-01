import { Field, ObjectType } from '@nestjs/graphql';
import { Session } from 'src/models/session.model';

export interface IGraphQLContext {
  session: Session;
}

export enum HEADERS {
  SESSION = 'x-session',
}

export type PairValue = [number, string];

export interface ITicketAttachment {
  base64: String;
  fileName: String;
}

@ObjectType()
export class AttachmentURL {
  @Field()
  url: string;

  @Field()
  fileName: string;
}
