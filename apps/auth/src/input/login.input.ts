import { Field, InputType } from '@nestjs/graphql';
import { User } from '@prisma/client';

@InputType({ description: 'New recipe data' })
export class LoginInput implements Partial<User> {
  @Field() email: string;
  @Field() password: string;
}
