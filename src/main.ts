import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { corsConfig } from './config/cors.config';

const DEFAULT_PORT = 3001;  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const port = Number(process.env.APP_PORT) ?? DEFAULT_PORT

  app.enableCors(corsConfig());
  app.setGlobalPrefix("api/v1.0");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  
  await app.listen(port);
  logger.log(`App running on port ${ port }`);
}
bootstrap();
