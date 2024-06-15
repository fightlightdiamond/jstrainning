import { IMatchLog } from '@app/shared/common/interfaces/match-log.interface';

export class SkillService {
  static resetSkill = (home, away): [IMatchLog, IMatchLog] => {
    home.isActiveSkill = false;
    away.takeSkillDmg = 0;
    home.takeDmg = 0;
    away.effectResistance = 0;
    return [home, away];
  };

  static Hell(home: IMatchLog, away: IMatchLog): [IMatchLog, IMatchLog] {
    if (away.effectResistance || home.intrinsicStatus === -1) {
      return SkillService.resetSkill(home, away);
    }

    if (home.current.hp / home.hp <= 0.7 && home.current.hp < away.current.hp) {
      home.isActiveSkill = true;
      home.current.atk += Math.round((away.current.hp - home.current.hp) / 10);
    }

    const ratioAwayHp = away.current.hp / away.hp;

    if (ratioAwayHp <= 0.3) {
      home.isActiveSkill = true;
      away.current.hp = 0;
    }

    return [home, away];
  }

  static Sphinx(home: IMatchLog, away: IMatchLog): [IMatchLog, IMatchLog] {
    if (away.effectResistance || home.intrinsicStatus === -1) {
      return SkillService.resetSkill(home, away);
    }

    home.isActiveSkill = true;

    away.current.def -= Math.round(
      30 + (away.current.def > 0 ? away.current.def * 0.1 : 0),
    );
    away.def -= Math.round(
      home.current.atk * 0.03 + (away.def > 0 ? away.def * 0.2 : 0),
    );

    if (home.turnNumber % 2 === 0 && home.current.hp < away.current.hp) {
      home.current.atk = Math.round(home.current.atk * 1.2);
    }

    return [home, away];
  }

  static Valkyrie(home: IMatchLog, away: IMatchLog): [IMatchLog, IMatchLog] {
    if (away.effectResistance || home.intrinsicStatus === -1) {
      return SkillService.resetSkill(home, away);
    }

    if (home.intrinsicStatus < 4) {
      home.intrinsicStatus += 1;
    }

    home.isActiveSkill = true;

    const dmg = Math.round(0.02 * home.intrinsicStatus * away.hp);
    away.takeSkillDmg = dmg;
    away.current.hp -= dmg;

    return [home, away];
  }

  static Hera(home: IMatchLog, away: IMatchLog): [IMatchLog, IMatchLog] {
    if (away.effectResistance || home.intrinsicStatus === -1) {
      return SkillService.resetSkill(home, away);
    }

    if (away.intrinsicStatus !== 0 && home.intrinsicStatus == 0) {
      //Kick hoat skill
      home.isActiveSkill = true;
      // Tang diem noi tai
      home.intrinsicStatus = 1;
      away.current.atk = Math.round(away.current.atk * 0.8);
      away.atk = Math.round(away.atk * 0.8);
    }

    if (away.intrinsicStatus === -1 || this.getRand() > 30) {
      home.current.critDmg = Math.round(home.current.critDmg * 1.1);
    } else {
      // Cam skill
      home.current.critRate += 5;
      home.effectResistance = 1;
    }
    home.isActiveSkill = true;

    return [home, away];
  }

  static getRand = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  static Darklord(home: IMatchLog, away: IMatchLog): [IMatchLog, IMatchLog] {
    if (away.effectResistance || home.intrinsicStatus === -1) {
      return SkillService.resetSkill(home, away);
    }

    const ratioHp = home.current.hp / home.hp;

    if (ratioHp <= 0.6) {
      home.isActiveSkill = true;
      home.current.atk = Math.round(home.current.atk * 1.6);
      home.current.def = Math.round(home.current.def * 1.5);
      home.intrinsicStatus = -1;
    }

    return [home, away];
  }

  static Poseidon(home: IMatchLog, away: IMatchLog): [IMatchLog, IMatchLog] {
    if (away.effectResistance || home.intrinsicStatus === -1) {
      return SkillService.resetSkill(home, away);
    }

    if (home.intrinsicStatus < 10) {
      home.isActiveSkill = true;
      home.intrinsicStatus += 1;
      home.current.atk = Math.round(home.current.atk * 1.075);
      home.current.def = Math.round(home.current.def * 1.02);
    }

    return [home, away];
  }

  static Fenrir(home: IMatchLog, away: IMatchLog): [IMatchLog, IMatchLog] {
    if (away.effectResistance || home.intrinsicStatus === -1) {
      return SkillService.resetSkill(home, away);
    }

    home.isActiveSkill = true;
    home.current.critRate += 5;
    home.current.critDmg += 20;
    home.intrinsicStatus += 1;

    return [home, away];
  }

  static Chiron(home: IMatchLog, away: IMatchLog): [IMatchLog, IMatchLog] {
    if (away.effectResistance || home.intrinsicStatus === -1) {
      return SkillService.resetSkill(home, away);
    }

    home.isActiveSkill = true;
    home.current.atk = Math.round(
      home.atk * (1 + ((home.hp - home.current.hp) / home.hp) * 0.85),
    );

    return [home, away];
  }

  static Phoenix(home: IMatchLog, away: IMatchLog): [IMatchLog, IMatchLog] {
    if (away.effectResistance || home.intrinsicStatus === -1) {
      return SkillService.resetSkill(home, away);
    }
    const skillDame = Math.round((home.hp - home.current.hp) * 0.09);
    away.current.hp -= skillDame;
    away.takeSkillDmg = skillDame;
    home.isActiveSkill = true;

    return [home, away];
  }

  static Synthia(home: IMatchLog, away: IMatchLog): [IMatchLog, IMatchLog] {
    if (away.effectResistance || home.intrinsicStatus === -1) {
      return SkillService.resetSkill(home, away);
    }

    home.intrinsicStatus += 1;
    away.takeSkillDmg = home.intrinsicStatus * home.current.atk * 0.1;
    away.current.hp -= away.takeSkillDmg;

    return [home, away];
  }

  static Amon(home: IMatchLog, away: IMatchLog): [IMatchLog, IMatchLog] {
    if (away.effectResistance || home.intrinsicStatus === -1) {
      return SkillService.resetSkill(home, away);
    }
    home.isActiveSkill = true;
    home.intrinsicStatus += 1;
    home.current.hp += Math.round(home.current.atk * 0.3);
    away.current.def -= Math.round(
      (home.hp - home.current.hp) * 0.006 + (away.def > 0 ? away.def * 0.2 : 0),
    );

    return [home, away];
  }

  static Nezha(home: IMatchLog, away: IMatchLog): [IMatchLog, IMatchLog] {
    if (away.effectResistance || home.intrinsicStatus === -1) {
      return SkillService.resetSkill(home, away);
    }

    const ratioHp = home.current.hp / home.hp;
    if (ratioHp <= 0.5 && this.getRand() <= 50) {
      home.isActiveSkill = true;
    }

    return [home, away];
  }
}
