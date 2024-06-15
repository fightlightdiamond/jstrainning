import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  lastName: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  firstName: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  password: string;
}
