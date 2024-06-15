import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class EmailExistsPipe implements PipeTransform {
  constructor(private prismaService: PrismaService) {}

  async transform(value: string) {
    const user = await this.prismaService.user.findFirst({
      where: { email: value }
    });
    if (user) {
      return value;
    }
    throw new BadRequestException('User not found');
  }
}
