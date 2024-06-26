import { NestFactory } from '@nestjs/core';
import { SocketModule } from './socket.module';

async function bootstrap() {
  const app = await NestFactory.create(SocketModule);
  await app.listen(6000);
}
bootstrap();

console.log('============== 6000');
