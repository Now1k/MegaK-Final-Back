import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages:
        false /* w srodowisku produkcyjnym powinno byc true*/,

      whitelist: true,
      forbidNonWhitelisted: true,

      transform: true,
    }),
  );
  app.use(cookieParser());
  app.enableCors({ origin: 'http://localhost:3000' });

  await app.listen(3001);
}

bootstrap();
