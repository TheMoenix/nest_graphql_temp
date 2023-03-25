import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.model';
import * as mongoose from 'mongoose';

export type SessionDocument = Session;

@ObjectType()
@Schema({ timestamps: true })
export class Session {
  @Field()
  _id: string;

  @Field()
  @Prop({ required: true })
  lastActivityAt: Date;

  @Field()
  @Prop({
    required: true,
    type: String,
    enum: ['expired', 'active'],
    default: 'active',
  })
  status: string;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
