import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class CreateUserArgs {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  name: string;
}

@ArgsType()
export class createSessionArgs {
  @Field()
  email: string;
}
