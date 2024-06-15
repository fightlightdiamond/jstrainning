import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
// import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

export default class GraphqlConfig {
  static getConfig(): ApolloDriverConfig {
    return {
      driver: ApolloDriver,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), '/schema.gql'),
      sortSchema: true,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()]
    };
  }
}
