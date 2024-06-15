import { CreateHeroInput } from './create-hero.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateHeroInput extends PartialType(CreateHeroInput) {
  id: number;
}
