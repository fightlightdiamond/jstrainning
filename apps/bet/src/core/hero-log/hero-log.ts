import { TurnService } from '../turn/turn.service';
import { Hero } from '@app/shared/common/utils/hero.util';
import { IMatchLog } from '@app/shared/common/interfaces/match-log.interface';
import {
  HeroAttribute,
  IHero,
  IHeroAttribute,
} from '@app/shared/common/interfaces/hero.interface';

export class HeroLog extends Hero implements IMatchLog {
  id: number;
  intrinsicStatus: number;
  hp: number;
  name: string;
  isActiveSkill: boolean;
  isCrit: boolean;
  takeDmg: number;
  takeDmgHealing: number;
  takeSkillDmg: number;
  status: number;
  turnNumber: number;
  isAtk: boolean;
  current: IHeroAttribute;

  /**
   * Set Attribute
   */
  setCurrent(): IMatchLog {
    this.current = new HeroAttribute();
    this.current.hp = this.hp;
    this.current.atk = this.atk;
    this.current.def = this.def;
    this.current.spd = this.spd;
    this.current.critRate = this.critRate;
    this.current.critDmg = this.critDmg;
    this.current.atkHealing = this.atkHealing;
    this.current.takeDmgHealing = this.takeDmgHealing;
    this.current.dodge = this.dodge;
    this.current.acc = this.acc;
    this.current.cc = this.cc;
    this.isAtk = false;
    return this;
  }

  /**
   * Hero atk
   * @param away
   */
  attack(away: IMatchLog): IMatchLog[] {
    // Turn 1
    const [home2, away2]: IMatchLog[] = TurnService.turn(this, away);

    if (away2.current.hp <= 0) {
      return [home2, away2];
    }

    // Turn 2
    const [away3, home3] = TurnService.turn(away2, home2);

    if (home3.current.hp <= 0) {
      return [home3, away3];
    }

    return [home2, away2, home3, away3];
  }

  /**
   * Set Đội tuyển
   * @param home
   */
  setHome(home: IHero): IMatchLog {
    for (const [key, value] of Object.entries(home)) {
      console.log(key, value);
      this[key] = value;
    }

    return this.setCurrent();
  }
}
