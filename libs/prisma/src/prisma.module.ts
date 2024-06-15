import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { HeroRepository } from '@app/prisma/repository/hero.repository';
import { MatchRepository } from '@app/prisma/repository/match.repository';
import { BetRepository } from '@app/prisma/repository/bet.repository';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
