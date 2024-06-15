import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@ValidatorConstraint({ name: 'UserHeroExists', async: true })
@Injectable()
export class UserHeroExistsRule implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(value: number) {
    return !!(await this.prismaService.user.findFirst({
      where: {
        id: value,
      }
    }));
  }

  defaultMessage(args: ValidationArguments) {
    return `User Hero doesn't exist ${args.value}`;
  }
}
