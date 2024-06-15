import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(ConsumerModule);
  await app.listen(4000);
}
bootstrap();

console.log('============== 4000');
