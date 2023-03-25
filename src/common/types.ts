import { Field, ObjectType } from '@nestjs/graphql';

export interface IGraphQLContext {
  user: {
    id: number;
    name: string;
    email: string;
  };
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
