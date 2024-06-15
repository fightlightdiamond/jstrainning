import { IMatchLog } from '@app/shared/common/interfaces/match-log.interface';
import { SkillFactory } from '../skill/skill.factory';
import { probability } from '@app/shared/common/utils/hero.util';

export class TurnService {
  /**
   * Turn
   * @param home
   * @param away
   */
  static turn(home: IMatchLog, away: IMatchLog) {
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

    // Dame
    let dame = home.current.atk;

    // Random xac suat crit
    const bProbability = probability();

    if (bProbability <= home.current.critRate) {
      dame = Math.round((dame * home.current.critDmg) / 100);
      home.isCrit = true;
    }

    dame -= away.current.def;
    if (dame < 0) {
      dame = 1;
    }
    away.takeDmg = dame;
    away.current.hp -= dame;

    return [home, away];
  }
}
