/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const port = 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is now running on: http://localhost:${port}`);
  
}
bootstrap();
