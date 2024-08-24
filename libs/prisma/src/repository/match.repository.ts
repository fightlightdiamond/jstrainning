import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class MatchRepository {
  constructor(private prisma: PrismaService) {}

  async save(match: any): Promise<any> {
    return this.prisma.match.create({
      data: match,
    });
  }

  query() {
    return this.prisma.match;
  }
}
