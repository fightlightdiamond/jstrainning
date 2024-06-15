import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@ValidatorConstraint({ name: 'HeroExists', async: true })
@Injectable()
export class HeroExistsRule implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(value: number) {
    return !!await this.prismaService.hero.findFirst({
        where: {
          id: value,
        }
      });
  }

  defaultMessage(args: ValidationArguments) {
    return `Hero doesn't exist ${args.value}`;
  }
}
