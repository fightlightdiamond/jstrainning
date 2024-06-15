import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { PrismaService } from '@app/prisma';

@Injectable()
export class UserExistsPipe implements PipeTransform {
  constructor(private prismaService: PrismaService) {
  }

  async transform(value: any) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: value
      }
    });
    if (user) {
      return value;
    }
    throw new BadRequestException('User not found');
  }
}
