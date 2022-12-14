import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://reddit.up.railway.app',
    credentials: true,
  });
  app.use(
    cookieSession({
      name: 'auth-session',
      keys: [process.env.COOKIE_KEYS],
      maxAge: parseInt(process.env.SESSION_EXPIRATION_TIME),
      secure: false,
      httpOnly: false,
      signed: false,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
