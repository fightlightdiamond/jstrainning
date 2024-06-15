import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { PreMatchCron } from './pre-match.cron';
import { RoundService } from './round.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { PrismaModule } from '@app/prisma';
import { HeroRepository } from '@app/prisma/repository/hero.repository';
import { MatchRepository } from '@app/prisma/repository/match.repository';

@Module({
  imports: [
    CacheModule.register(),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 63791,
      },
    }),
    BullModule.registerQueue({
      name: 'socket.io',
    }),
    BullModule.registerQueue({
      name: 'bet',
    }),
    PrismaModule,
  ],
  controllers: [],
  providers: [PreMatchCron, RoundService, HeroRepository, MatchRepository],
})
export class CronModule {}
