import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from '@repo/env';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT_ADMIN_API ?? 3000);
}
bootstrap();
