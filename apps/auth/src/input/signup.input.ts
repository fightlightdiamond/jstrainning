import { Field, InputType } from '@nestjs/graphql';
import { User } from 'apps/bet/src/user/entities/user.entity';

@InputType({ description: 'New recipe data' })
export class SignupInput implements Partial<User> {
  @Field() email: string;
  @Field() password: string;
}
