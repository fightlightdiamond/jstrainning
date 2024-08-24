import { IsEmail, IsString, Max, Min } from 'class-validator';

export class CreateHeroInput {
  @IsEmail()
  @Min(8)
  @Max(200)
  @IsString()
  email: string;

  @Min(8)
  @Max(200)
  @IsString()
  password: string;

  @Min(8)
  @Max(200)
  @IsString()
  name: string;
}
