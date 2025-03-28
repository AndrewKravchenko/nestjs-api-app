import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { handleRoutesAndSaveToDb } from '@utils/route-handler.util';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);

  // await handleRoutesAndSaveToDb(app);
}

bootstrap();
