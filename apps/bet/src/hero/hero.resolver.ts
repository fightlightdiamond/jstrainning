import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HeroService } from './hero.service';
import { CreateHeroInput } from './dto/create-hero.input';
import { UpdateHeroInput } from './dto/update-hero.input';

@Resolver('Hero')
export class HeroResolver {
  constructor(private readonly heroService: HeroService) {}

  @Mutation('createHero')
  create(@Args('createHeroInput') createHeroInput: CreateHeroInput) {
    return this.heroService.create(createHeroInput);
  }

  @Query('hero')
  findAll() {
    return this.heroService.findAll();
  }

  @Query('hero')
  findOne(@Args('id') id: number) {
    return this.heroService.findOne(id);
  }

  @Mutation('updateHero')
  update(@Args('updateHeroInput') updateHeroInput: UpdateHeroInput) {
    return this.heroService.update(updateHeroInput.id, updateHeroInput);
  }

  @Mutation('removeHero')
  remove(@Args('id') id: number) {
    return this.heroService.remove(id);
  }
}
