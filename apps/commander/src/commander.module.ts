import { Module } from '@nestjs/common';
import { CommanderService } from './commander.service';
import { CommandTutorial } from './command-tutorial';

@Module({
  imports: [],
  controllers: [],
  providers: [CommanderService, CommandTutorial],
})
export class CommanderModule {}
