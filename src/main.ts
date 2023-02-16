import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
