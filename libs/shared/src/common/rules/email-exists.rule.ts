import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class EmailExistsRule implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(value: string) {
    return !!(await this.prismaService.user.findFirst({
      where: {
        email: value,
      },
    }));
  }

  defaultMessage(args: ValidationArguments) {
    return `Email exist ${args.value}`;
  }
}
