import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PrismaService } from '@app/prisma';
import { BetStatusConstant } from '@app/shared/common/constants/bet-status.constant';
import { UserGemService } from '../../bet/src/core/user-gem/user-gem.service';
import { NameQueueConstant } from '@app/shared/common/constants/name-queue.constant';

@Injectable()
export class RewardService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userGemService: UserGemService,
    @InjectQueue('socket.io') private readonly queue: Queue,
  ) {}

  /**
   * TODO: chưa test
   */
  async execute(id: number) {
    const match = await this.prismaService.match.findFirst({
      where: {
        id: id,
      },
    });

    const { winner } = match;

    console.log({ winner, id });

    await this.prismaService.match.update({
      where: { id: match.id },
      data: {
        status: BetStatusConstant.END,
      },
    });

    const bets = await this.prismaService.bet.findMany({
      where: {
        matchId: id,
        heroId: winner,
      },
      select: { userId: true, balance: true, matchId: true, heroId: true },
    });

    console.log({ bets });

    /**
     * TODO: sau này cần chuyển qua update switch case
     */
    const ps = [];
    for (const bet of bets) {
      ps.push(
        this.prismaService.user.update({
          where: {
            id: bet.userId,
          },
          data: {
            balance: {
              increment: bet.balance * 2,
            },
          },
        }),
      );
      if (this.userGemService.isDropGem()) {
        ps.push(this.userGemService.add(bet.userId));
        console.log(
          `-------    User has id:${bet.userId} earned gem    --------`,
        );
      }
    }
    await Promise.all(ps);

    await this.queue.add(NameQueueConstant.ROOM_QUEUE, {
      room: 'all',
      event: 'reward',
      data: bets,
    });
  }
}
