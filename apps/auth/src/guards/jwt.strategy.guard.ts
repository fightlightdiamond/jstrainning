import { Injectable, UnauthorizedException, Request } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import JwtConfig from '../configs/jwt.config';

/**
 * Jwt Strategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * @param config
   */
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      // algorithms: ['HS256'],
      secretOrKey: JwtConfig.getConfig(config).secret,
      // secretOrPrivateKey: config.get<string>('JWT_SECRET'),
      // passReqToCallback: true,
    });
  }

  /**
   * validate
   * @param req
   * @param payload
   */
  async validate(payload) {
    const { user } = payload;
    return user;
  }
}
