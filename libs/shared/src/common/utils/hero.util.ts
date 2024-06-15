import { IHero } from '@app/shared/common/interfaces/hero.interface';

export function probability() {
  return Math.floor(Math.random() * 101);
}

export class Hero implements IHero {
  atk: number;
  atkHealing: number;
  def: number;
  hp: number;
  name: string;
  spd: number;
  critRate?: number;
  critDmg?: number;
  status?: number;
  intrinsicStatus: number;
  effectResistance: number;
  dodge: number;
  acc: number;
  cc: number;
}
