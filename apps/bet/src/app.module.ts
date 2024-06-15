import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import GraphqlConfig from '../config/graphql.config';
import { AuthModule } from '../../auth/src/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>(GraphqlConfig.getConfig()),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
