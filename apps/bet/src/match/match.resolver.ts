import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MatchService } from './match.service';
import { CreateMatchInput } from './dto/create-match.input';
import { UpdateMatchInput } from './dto/update-match.input';

@Resolver('Match')
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

  @Mutation('createMatch')
  create(@Args('createMatchInput') createMatchInput: CreateMatchInput) {
    return this.matchService.create(createMatchInput);
  }

  @Query('match')
  findAll() {
    return this.matchService.findAll();
  }

  @Query('match')
  findOne(@Args('id') id: number) {
    return this.matchService.findOne(id);
  }

  @Mutation('updateMatch')
  update(@Args('updateMatchInput') updateMatchInput: UpdateMatchInput) {
    return this.matchService.update(updateMatchInput.id, updateMatchInput);
  }

  @Mutation('removeMatch')
  remove(@Args('id') id: number) {
    return this.matchService.remove(id);
  }
}
