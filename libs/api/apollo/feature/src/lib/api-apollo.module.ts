import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { RootResolver } from '@forprosjekt/api/apollo/data-access';
import GraphQLJSON from 'graphql-type-json';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      resolvers: {
        JSON: GraphQLJSON,
      },
    }),
  ],
  providers: [RootResolver],
})
export class ApiApolloModule {}
