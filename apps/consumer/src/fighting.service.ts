import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { BetStatusConstant } from '@app/shared/common/constants/bet-status.constant';
import ISocketQueueContract from '@app/shared/common/contracts/socket-queue.contract';
import { NameQueueConstant } from '@app/shared/common/constants/name-queue.constant';
import { MatchRepository } from '@app/prisma/repository/match.repository';
import { IMatchLog } from '@app/shared/common/interfaces/match-log.interface';
import { Match } from 'apps/bet/src/match/entities/match.entity';

@Injectable()
export class FightingService {
  home: IMatchLog;
  away: IMatchLog;
  round = 1;
  match: Match;

  constructor(
    @InjectQueue('socket.io') private readonly queue: Queue,
    private readonly matchRepository: MatchRepository,
  ) {}

  async execute(id: number) {
    const match = await this.matchRepository.query().findFirst({
      where: { id },
      select: {
        id: true,
        heroInfo: true,
        turns: true,
        status: true,
        startTime: true,
      },
    });

    if (!match) {
      throw new HttpException('Match not found', HttpStatus.NOT_FOUND);
    }

    await this.matchRepository.query().update({
      where: { id: match.id },
      data: {
        status: BetStatusConstant.FIGHTING,
      },
    });

    match.status = BetStatusConstant.FIGHTING;
    const data: ISocketQueueContract = {
      event: 'matching',
      room: 'match',
      data: match,
    };

    await this.queue.add(NameQueueConstant.ROOM_QUEUE, data);
  }
}
