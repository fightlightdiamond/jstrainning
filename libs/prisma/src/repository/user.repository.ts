import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  query() {
    return this.prisma.user;
  }
}
