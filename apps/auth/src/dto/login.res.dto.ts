import { User } from '@prisma/client';

export interface ILoginResDto {
  token: string;
  user: User;
}
