export interface IHeroAttribute {
  hp: number;
  atk: number;
  def: number;
  spd: number;
  // Special stats
  critRate?: number;
  critDmg?: number;
  // L1
  atkHealing?: number;
  takeDmgHealing?: number;
  // L2
  dodge?: number;
  acc?: number;
  // L3
  cc?: number;
  intrinsicStatus?: number;
  effectResistance?: number;
}

export interface IHeroBase extends IHeroAttribute {
  name: string;
}

export interface IHero extends IHeroBase {
  name: string;
  status?: number;
  element?: string;
  position?: string;
  img?: string;
}

export class HeroAttribute implements IHeroAttribute {
  name: number;
  hp: number;
  atk: number;
  def: number;
  spd: number;
  // Special stats
  critRate?: number;
  critDmg?: number;
  // L1
  atkHealing?: number;
  takeDmgHealing?: number;
  // L2
  dodge?: number;
  acc?: number;
  // L3
  cc?: number;
  intrinsicStatus?: number;
  effectResistance?: number;
}
