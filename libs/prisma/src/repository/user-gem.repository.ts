import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserGemRepository {
  constructor(private prisma: PrismaService) {}

  query() {
    return this.prisma.userGem;
  }
}
