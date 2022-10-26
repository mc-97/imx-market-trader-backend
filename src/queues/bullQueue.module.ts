import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/appConfig/app.config.module';
import { AppConfigService } from 'src/appConfig/app.config.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: async (appConfigService: AppConfigService) => ({
        redis: {
          host: appConfigService.getRedisHost(),
          port: appConfigService.getRedisPort()
        }
      }),
      imports: [AppConfigModule],
      inject: [AppConfigService]
    })
  ]
})
export class BullQueueModule {}
