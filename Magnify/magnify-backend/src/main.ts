import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(session({
    name: "magnify-session",
    secret:
      "7#foot#frame#rats#along#his#back#when#he#calls#your#name#it#all#fades#to#black!",
    resave: false,
    // saveUninitialized: true,
  }));
  // app.use(helmet());
  await app.listen(4000);
}
bootstrap();
