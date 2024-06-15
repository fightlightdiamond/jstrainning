import { CommandRunner } from 'nest-commander';
export class CommandTutorial extends CommandRunner {
  constructor() {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    console.log('CLI Params', passedParams);
    console.log('CLI Options', options);
    return Promise.resolve(undefined);
  }
}