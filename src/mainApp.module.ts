import { Module } from '@nestjs/common';
import { AppConfigModule } from './appConfig/app.config.module';
import { EndpointsServicesModule } from './endpoints/endpoints.services.module';
import { EndpointsControllersModule } from './endpoints/endpoints.controllers.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { join } from 'path';
import { QueuesServicesModule } from './queues/queues.services.module';

@Module({
  imports: [
    AppConfigModule,
    WinstonModule.forRoot({
      level: 'debug',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [
        new winston.transports.Console({
          level: 'debug'
        }),
        new winston.transports.File({
          dirname: join(__dirname, './../logs/'),
          filename: 'logs.log',
          level: 'info'
        })
      ]
    }),
    EndpointsServicesModule,
    EndpointsControllersModule,
    QueuesServicesModule
  ]
})
export class MainAppModule {}
