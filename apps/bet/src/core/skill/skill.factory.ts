/**
 * skill
 * @param home
 * @param away
 * @param log
 */
import { SkillService } from './skill.service';
import { IMatchLog } from '@app/shared/common/interfaces/match-log.interface';

export class SkillFactory {
  static create(home: IMatchLog, away: IMatchLog): [IMatchLog, IMatchLog] {
    switch (home.name) {
      case 'Hell':
        return SkillService.Hell(home, away);
      case 'Sphinx':
        return SkillService.Sphinx(home, away);
      case 'Darklord':
        return SkillService.Darklord(home, away);
      case 'Valkyrie':
        return SkillService.Valkyrie(home, away);
      case 'Poseidon':
        return SkillService.Poseidon(home, away);
      case 'Phoenix':
        return SkillService.Phoenix(home, away);
      case 'Chiron':
        return SkillService.Chiron(home, away);
      case 'Hera':
        return SkillService.Hera(home, away);
      case 'Fenrir':
        return SkillService.Fenrir(home, away);
      case 'Amon':
        return SkillService.Amon(home, away);
      case 'Nezha':
        return SkillService.Nezha(home, away);
      default:
        throw Error('Not found skill for Hero');
    }
  }
}
