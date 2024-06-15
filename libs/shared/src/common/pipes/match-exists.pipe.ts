import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class MatchExistsPipe implements PipeTransform {
  constructor(private prismaService: PrismaService) {
  }

  async transform(value: any) {

    const match = await this.prismaService.match.findFirst({
      where: {
        id: value
      }
    });

    if (match) {
      return value;
    }

    throw new BadRequestException('Match not found');

  }
}
