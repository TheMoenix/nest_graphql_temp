import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User;

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field()
  _id: string;

  @Field()
  updatedAt: Date;

  @Field()
  createdAt: Date;

  @Field()
  @Prop({ required: true })
  username: string;

  @Field()
  @Prop({ required: true })
  email: string;

  @Field({ nullable: true })
  @Prop()
  name: string;

  @Field({ nullable: true })
  @Prop()
  phone: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field()
  @Prop({
    required: true,
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  })
  roll: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
