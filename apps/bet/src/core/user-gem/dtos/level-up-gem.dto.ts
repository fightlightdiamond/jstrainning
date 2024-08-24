import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, isEnum, IsIn, IsInt, IsNumber, IsString, Max, Min } from 'class-validator';
import { GemLevelUpConstant } from '../constants/gem-level-up.constant';
import { GemTypeConstant } from '../constants/gem-type.constant';
import { Type } from 'class-transformer';

export class LevelUpGemDto {
  @ApiProperty({
    description: 'Level of gems you want to up',
    default: 1,
    required: true,
  })
  @IsNumber()
  @IsInt()
  @Min(1)
  level: number;

  @ApiProperty({ description: 'Gems type', required: true, enum: GemTypeConstant })
  @IsEnum(GemTypeConstant)
  type: GemTypeConstant;

  @ApiProperty({
    description: 'Number of gems you want to use for level up',
    default: 10,
    required: true,
  })
  @IsNumber()
  @IsInt()
  @Min(GemLevelUpConstant.MIN_GEMS)
  @Max(GemLevelUpConstant.MAX_GEMS)
  number: number;
}
