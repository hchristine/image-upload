import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './shared/filters/validation-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe()
  );

  // app.useGlobalFilters(
  //   new ValidationExceptionFilter()
  // );

  await app.listen(3000);
}
bootstrap();
