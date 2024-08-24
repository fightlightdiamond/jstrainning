import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { GemLevelUpConstant } from './constants/gem-level-up.constant';
import { GemTypeConstant } from './constants/gem-type.constant';
import { GetGemsDto } from './dtos/get-gems.dto';
import { LevelUpGemDto } from './dtos/level-up-gem.dto';
import { GEM_COMMON_CONST } from '@app/shared/common/constants/gems-common.constant';
import { PrismaService } from '@app/prisma';

@Injectable()
export class UserGemService {
  constructor(private prisma: PrismaService) {}

  async all(getGemDto: GetGemsDto, userId: number) {
    const { page, limit } = getGemDto;
    return this.prisma.userGem.findMany({
      where: {
        userId: userId,
        availableNum: { gt: 0 },
      },
      orderBy: { level: 'desc' },
      skip: limit * (page - 1),
      take: limit,
    });
  }

  isDropGem(): boolean {
    const r = Math.floor(Math.random() * 100) + 1;
    if (r <= GEM_COMMON_CONST.DROP_CHANCE) {
      return true;
    }
    return false;
  }

  async add(userId: number, type: GemTypeConstant, level: number = null): Promise<boolean> {
    if (!level) {
      level = 1;
    }
    const existedGem = await this.prisma.userGem.findFirst({
      where: {
        userId: userId,
        level: level,
        type: type,
      },
    });
    if (existedGem) {
      await this.prisma.userGem.update({
        where: { id: existedGem.id },
        data: { availableNum: { increment: 1 } },
      });
    } else {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return;
      }

      await this.prisma.userGem.create({
        data: {
          user: {
            connect: { id: userId },
          },
          level: level,
          type: type,
          availableNum: 1,
          attachedNum: 0,
        }, // Ensure the type matches Prisma schema
      });
    }
    return true;
  }

  randomGemType(enumObj: GemTypeConstant) {
    const enumValues = Object.values(enumObj);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
  }

  async levelUp(levelUpGemBody: LevelUpGemDto, userId: number): Promise<object> {
    const level = levelUpGemBody.level;
    const type = levelUpGemBody.type;
    const usedGemNumber = levelUpGemBody.number;
    const userGems = await this.prisma.userGem.findFirst({
      where: {
        userId: userId,
        type: type,
        level: level,
      },
    });
    console.log('userGems:', userGems);

    if (!userGems || !this.isEnoughGem(usedGemNumber, userGems?.availableNum)) {
      throw new UnprocessableEntityException({
        message: `Your gems not enough`,
      });
    }
    const successChance = (usedGemNumber / GemLevelUpConstant.MAX_GEMS) * 100;
    let message = `Level up gem failure!`;
    const r = Math.floor(Math.random() * 100) + 1;
    if (r <= successChance) {
      await this.add(userId, type, level + 1);
      message = `Level up gem successfully!`;
    }
    await this.decreaseGems(userId, type, level, usedGemNumber);
    return {
      message,
    };
  }

  isEnoughGem(usedGems: number, availableGem: number): boolean {
    return usedGems <= availableGem;
  }

  async decreaseGems(
    userId: number,
    type: GemTypeConstant,
    level: number,
    usedGemNumber: number,
  ) {
    await this.prisma.userGem.updateMany({
      where: {
        userId: userId,
        type: type,
        level: level,
      },
      data: {
        availableNum: {
          decrement: usedGemNumber,
        },
      },
    });
  }
}