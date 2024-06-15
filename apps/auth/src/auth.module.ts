import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule, PrismaService } from '@app/prisma';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfigAsync } from './configs/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../../bet/src/user/user.module';
import { UserService } from '../../bet/src/user/user.service';
import { JwtStrategy } from './guards/jwt.strategy.guard';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule,
    //Auth must passport
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtConfigAsync),
    PrismaModule,
    UserModule,
  ],
  controllers: [],
  providers: [AuthService, PrismaService, AuthResolver, UserService, AuthGuard, JwtStrategy, GqlAuthGuard],
  exports: [JwtStrategy]
})
export class AuthModule {}
