import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@ValidatorConstraint({ name: 'MatchExists', async: true })
@Injectable()
export class MatchExistsRule implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(value: number) {
    return !!(await this.prismaService.match.findFirst({
      where: {
        id: value,
      },
    }));
  }

  defaultMessage(args: ValidationArguments) {
    return `Match doesn't exist ${args.value}`;
  }
}
