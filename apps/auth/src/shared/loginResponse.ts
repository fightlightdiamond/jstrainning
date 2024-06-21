import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'apps/bet/src/user/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field() token: string;
  @Field() user: User;
}
