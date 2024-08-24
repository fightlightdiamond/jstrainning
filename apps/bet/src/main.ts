import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    disableErrorMessages: false,
    validateCustomDecorators: true,
    whitelist: true, //only dto
  }));

  const config = new DocumentBuilder()
    .setTitle('BET API')
    .setDescription('The cats API description')
    .setVersion('1.0')
    // .addTag('bets')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

bootstrap();

console.log('============== 3000');
