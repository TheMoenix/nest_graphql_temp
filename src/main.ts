import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import 'source-map-support/register';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useStaticAssets(`${__dirname}/public`);
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  app.enableCors();
  await app.listen(app.get(ConfigService).get('MOENIX_WORKING_PORT'));
}
bootstrap();
