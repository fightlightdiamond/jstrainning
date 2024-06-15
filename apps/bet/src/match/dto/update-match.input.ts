import { CreateMatchInput } from './create-match.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateMatchInput extends PartialType(CreateMatchInput) {
  id: number;
}
