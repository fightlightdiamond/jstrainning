import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BetRepository {
  constructor(private prisma: PrismaService) {}

  query() {
    return this.prisma.bet;
  }
}
