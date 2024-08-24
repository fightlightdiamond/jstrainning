import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'GemIdsUnique' })
@Injectable()
export class GemIdsUniqueRule implements ValidatorConstraintInterface {
  validate(list: number[]) {
    const lenghBefore = list.length;
    const gemIdsUnique = list.filter(function (x, i, a) {
      return a.indexOf(x) == i;
    });

    return gemIdsUnique.length >= lenghBefore;
  }

  defaultMessage() {
    return `Gem ids must be unique`;
  }
}
