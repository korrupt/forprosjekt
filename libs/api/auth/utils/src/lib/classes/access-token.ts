import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AccessToken {
  @Field(() => String)
  access_token: string;
}
