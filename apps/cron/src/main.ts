import { NestFactory } from '@nestjs/core';
import { CronModule } from './cron.module';

async function bootstrap() {
  const app = await NestFactory.create(CronModule);
  await app.listen(5000);
}
bootstrap();

console.log('============== 5000');
