import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './mainApp.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const mainApp = await NestFactory.create(MainAppModule);
  mainApp.useLogger(mainApp.get(WINSTON_MODULE_NEST_PROVIDER));

  mainApp.enableCors();

  const config = new DocumentBuilder()
    .setTitle('IMX Market Trader')
    .setDescription('IMX Market Trader backend API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(mainApp, config);
  SwaggerModule.setup('', mainApp, document);

  await mainApp.listen(3001);
}
bootstrap();
