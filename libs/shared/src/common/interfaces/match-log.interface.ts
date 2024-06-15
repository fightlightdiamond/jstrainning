import { IHero, IHeroAttribute, IHeroBase } from './hero.interface';
export interface IMatchLog extends IHeroBase {
  id: number;
  current: IHeroAttribute;
  turnNumber: number;
  isAtk?: boolean;
  isCrit?: boolean;
  isActiveSkill?: boolean;
  takeSkillDmg?: number;
  takeDmg?: number;
  attack(away: IMatchLog): IMatchLog[];
  setHome(home: IHero): IMatchLog;
  setCurrent(): IMatchLog;
}
