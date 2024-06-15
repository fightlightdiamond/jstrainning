import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(private prismaService: PrismaService) {}

  async validate(value: number) {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: value,
        }
      });
      return !!user;
  }

  defaultMessage(args: ValidationArguments) {
    return `User doesn't exist ${args.value}`;
  }
}
