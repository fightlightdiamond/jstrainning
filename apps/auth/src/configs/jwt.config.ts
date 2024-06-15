import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default class JwtConfig {
  static getConfig(config: ConfigService): JwtModuleOptions {
    return {
      // global: true,
      secret: config.get<string>('JWT_SECRET', 'JWT_SECRET'),
      signOptions: { expiresIn: '7d' },
    };
  }
}

export const jwtConfigAsync: any = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => JwtConfig.getConfig(config),
};
