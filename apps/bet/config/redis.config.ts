import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Redis from 'ioredis';
import Joi from 'joi';

const redisConfigSchema = Joi.object({
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().optional(),
  REDIS_DB: Joi.number().default(0),
});

export default class RedisConfig {
  static getConfig(configService: ConfigService): Redis.RedisOptions {
    const { error, value: envVars } = redisConfigSchema.validate(
      {
        REDIS_HOST: configService.get<string>('REDIS_HOST'),
        REDIS_PORT: configService.get<number>('REDIS_PORT'),
        REDIS_PASSWORD: configService.get<string>('REDIS_PASSWORD'),
        REDIS_DB: configService.get<number>('REDIS_DB'),
      },
      {
        allowUnknown: true,
        stripUnknown: true,
      },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return {
      host: envVars.REDIS_HOST,
      port: envVars.REDIS_PORT,
      password: envVars.REDIS_PASSWORD,
      db: envVars.REDIS_DB,
    };
  }
}

export const redisConfigAsync = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): Redis.RedisOptions =>
    RedisConfig.getConfig(configService),
  cache: true,
  expandVariables: true,
};
