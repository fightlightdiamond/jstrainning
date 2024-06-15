import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginReqDto } from './dto/login.req.dto';
import { User } from '@prisma/client';
import JwtConfig from './configs/jwt.config';
import { PrismaService } from '@app/prisma';
import { LoginResponse } from './shared/loginResponse';
import { ErrorResponse } from './shared/errorResponse';
import { SignupInput } from './input/signup.input';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   *
   * @param signupInput
   */
  async signup(signupInput: SignupInput): Promise<ErrorResponse[] | null> {
    const userExit = await this.prismaService.user.findFirst({
      where: { email: signupInput.email },
    });
    if (userExit) {
      return [
        {
          path: 'email',
          message: 'invalid email',
        },
      ];
    }

    const salt = await bcrypt.genSalt();
    signupInput.password = await bcrypt.hash(signupInput.password, salt);

    await this.prismaService.user.create({
      data: signupInput,
    });

    return null;
  }

  /**
   * Login
   * @param user
   */
  signIn(user: LoginReqDto): Observable<LoginResponse> {
    const { email, password } = user;
    return this.validateUser(email, password).pipe(
      switchMap((user: User) => {
        const payload = {
          user: {
            id: user.id,
            email: user.email,
          },
        };
        return from(
          this.jwtService.signAsync(payload, {
            secret: JwtConfig.getConfig(this.config).secret,
          }),
        ).pipe(
          map((jwt) => {
            return {
              user,
              token: jwt,
            };
          }),
        );
      }),
    );
  }

  /**
   * Validate User
   * @param email
   * @param password
   */
  validateUser(email: string, password: string): Observable<User> {
    return from(
      this.prismaService.user.findFirst({
        where: { email },
      }),
    ).pipe(
      switchMap((user: User) => {
        if (!user) {
          throw new HttpException(
            { status: HttpStatus.NOT_FOUND, error: 'Invalid Credentials' },
            HttpStatus.NOT_FOUND,
          );
        }
        return from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password;
              return user;
            }
            throw new HttpException(
              { status: HttpStatus.NOT_FOUND, error: 'Password Incorrect' },
              HttpStatus.NOT_FOUND,
            );
          }),
        );
      }),
    );
  }

  getJwtUser(jwt: string): Observable<User | null> {
    return from(this.jwtService.verifyAsync(jwt)).pipe(
      map(({ user }: { user: User }) => {
        return user;
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }
}
