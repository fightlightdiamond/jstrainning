import { PrismaService } from '@app/prisma';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HeroRepository {
  constructor(private prisma: PrismaService) {}

  query() {
    return this.prisma.hero;
  }

  /**
   * Get Pair Heroes
   */
  async getPairHeroes() {
    return this.prisma.$queryRaw(
      Prisma.sql`SELECT t.* FROM public."Hero" t order by random() limit 2`,
    );
  }

  /**
   * GET IDS
   */
  async getIds() {
    return this.prisma.hero.findMany({
      select: {
        id: true,
      },
    });
  }
}
