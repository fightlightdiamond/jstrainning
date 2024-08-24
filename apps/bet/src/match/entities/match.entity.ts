import { IMatchLog } from '@app/shared/common/interfaces/match-log.interface';
import {
  IHero,
  IHeroAttribute,
} from '@app/shared/common/interfaces/hero.interface';

export class Match implements IMatchLog {
  atk: number;
  current: IHeroAttribute;
  def: number;
  hp: number;
  id: number;
  name: string;
  spd: number;
  turnNumber: number;
  status: number;

  attack(away: IMatchLog): IMatchLog[] {
    return [];
  }

  setCurrent(): IMatchLog {
    return undefined;
  }

  setHome(home: IHero): IMatchLog {
    return undefined;
  }
}
