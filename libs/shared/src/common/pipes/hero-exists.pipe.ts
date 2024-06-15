import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class HeroExistsPipe implements PipeTransform {
  constructor(private prismaService: PrismaService) {
  }

  async transform(value: any) {
    try {
      await this.prismaService.hero.findFirst({
        where: {id: value,}
      });
    } catch (e) {
      throw new BadRequestException('Hero not found');
    }

    return value;
  }
}
