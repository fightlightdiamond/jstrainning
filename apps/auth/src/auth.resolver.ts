import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { map, Observable } from 'rxjs';
import { LoginInput } from './input/login.input';
import { AuthService } from './auth.service';
import { LoginResponse } from './shared/loginResponse';
import { User } from '../../bet/src/user/entities/user.entity';
import { ErrorResponse } from './shared/errorResponse';
import { SignupInput } from './input/signup.input';
import { UseGuards, Request, Req } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => [ErrorResponse], { nullable: true })
  // @UsePipes(new YupValidationPipe(signupInputSchema))
  async signUp(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<ErrorResponse[] | null> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => LoginResponse || String, {
    nullable: true,
  })
  signIn(
    @Args('loginInput') loginInput: LoginInput,
  ): Observable<LoginResponse> | string {
    try {
      const u = new User();
      u.email = loginInput.email;
      u.password = loginInput.password;
      return this.authService.signIn(u).pipe(map((res: LoginResponse) => res));
    } catch (e) {
      return 'error';
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  getProfile(@Context() context) {
    return context?.req?.user;
  }
}
