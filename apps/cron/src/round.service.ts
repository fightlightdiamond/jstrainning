import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { IMatchLog } from '@app/shared/common/interfaces/match-log.interface';
import { BetStatusConstant } from '@app/shared/common/constants/bet-status.constant';
import { probability } from '@app/shared/common/utils/hero.util';
import { IHero } from '@app/shared/common/interfaces/hero.interface';
import { Match } from '../../bet/src/match/entities/match.entity';
import { SkillFactory } from '../../bet/src/core/skill/skill.factory';
import { HeroLog } from '../../bet/src/core/hero-log/hero-log';
import { HeroRepository } from '@app/prisma/repository/hero.repository';
import { MatchRepository } from '@app/prisma/repository/match.repository';
import * as moment from 'moment';

@Injectable()
export class RoundService {
  home: IMatchLog;
  away: IMatchLog;
  turnNumber = 1;
  match: Match;
  heroInfo: any = [];
  turns: any = [];

  constructor(
    private readonly heroRepository: HeroRepository,
    private readonly matchRepository: MatchRepository,
  ) {}

  async bet() {
    const heroes = await this.heroRepository.getPairHeroes();
    const logs = this.preBet(heroes[0], heroes[1]);
    return logs.execute();
  }

  /**
   * Chuẩn bi data
   * @param home
   * @param away
   */
  preBet(home: IHero, away: IHero) {
    console.log({ home, away });
    this.turnNumber = 1;
    this.home = new HeroLog().setHome(home);
    console.log('Home');
    this.away = new HeroLog().setHome(away);
    console.log('away');
    this.turns = [];
    this.heroInfo = [_.cloneDeep(this.home), _.cloneDeep(this.away)];

    return this;
  }

  /**
   * execute
   */
  async execute(): Promise<Match> {
    while (
      this.home.current.hp > 0 &&
      this.away.current.hp > 0 &&
      this.turnNumber < 20
    ) {
      this.home.turnNumber = this.turnNumber;
      this.away.turnNumber = this.turnNumber;

      if (this.home.current.spd > this.away.current.spd) {
        this.attack(this.home, this.away);
      } else {
        this.attack(this.away, this.home);
      }

      this.turnNumber++;
    }

    const dataMatchUpdate = {
      heroInfo: this.heroInfo,
      turnNumber: this.turnNumber,
      winner:
        this.home.current.hp > this.away.current.hp
          ? this.home.id
          : this.away.id,
      loser:
        this.home.current.hp > this.away.current.hp
          ? this.away.id
          : this.home.id,
      turns: this.turns,
      startTime: moment().toISOString(),
      status: BetStatusConstant.BETTING,
    };

    const match = await this.matchRepository.save(dataMatchUpdate);

    match.winner = 0;
    match.loser = 0;
    match.turns = [];

    return match;
  }

  /**
   * Tấn công của turn
   * @param home
   * @param away
   */
  turnAtk(home, away) {
    //Reset
    home.isActiveSkill = false;
    home.takeSkillDmg = 0;
    home.isActiveSkill = false;
    home.takeDmg = 0;

    away.isActiveSkill = false;
    away.takeDmg = 0;
    away.isActiveSkill = false;
    away.takeSkillDmg = 0;
    // Skill
    const [i, y]: [IMatchLog, IMatchLog] = SkillFactory.create(home, away);
    home = i;
    away = y;

    // Random xac suat ne'
    const dodgeProbability = probability();
    if (dodgeProbability > away.dodge) {
      // Dame
      let dame = home.current.atk;
      dame -= away.current.def;

      // Random xac suat crit
      const bProbability = probability();

      if (bProbability <= home.current.critRate) {
        dame = Math.round((dame * home.current.critDmg) / 100);
        home.isCrit = true;
      }

      // Neu dame < 0 thi mac dinh doi phuong mat 1 HP
      if (dame < 0) {
        dame = 1;
      }

      // Neu tuong la` Nezha
      const ratioHp = home.current.hp / home.hp;
      if (home.name == 'Nezha') {
        if (ratioHp <= 0.8) {
          // Hoi HP tuong duong 50% dame
          home.current.hp += Math.round(dame * 0.5);
        }
        if (home.isActiveSkill && ratioHp <= 0.5) {
          // Gay them dame = 2 * dame
          const skillDame = dame * 2;
          away.current.hp -= skillDame;
          away.takeSkillDmg = skillDame;
        }
      }

      away.takeDmg = dame;
      away.current.hp -= dame;
    } else {
      //TODO: xử lý hiển thị né
      //away.takeDmg = -1;
    }

    this.turns.push(this.getData(home));
    this.turns.push(this.getData(away));
  }

  getData(home) {
    return _.cloneDeep(home);
  }

  /**
   * Đánh
   */
  attack(home, away): IMatchLog[] {
    // Turn 2
    this.home.isAtk = true;
    this.away.isAtk = false;
    this.turnAtk(home, away);

    if (this.home.current.hp <= 0 || this.away.current.hp < 0) {
      return;
    }

    // Turn 2
    this.away.isAtk = true;
    this.home.isAtk = false;
    this.turnAtk(away, home);

    return;
  }
}
