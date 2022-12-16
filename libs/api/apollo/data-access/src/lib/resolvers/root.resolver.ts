import { Resolver, Query } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@Resolver()
export class RootResolver {
  @Query(() => String)
  public helloWorld(): string {
    return 'Hello World';
  }

  @Query(() => GraphQLJSON)
  public getJson() {
    return JSON.stringify({ message: 'Hello World!' });
  }
}
