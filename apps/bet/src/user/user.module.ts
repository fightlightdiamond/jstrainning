import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaModule, PrismaService } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
