import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/appConfig/app.config.module';
import { AppConfigService } from 'src/appConfig/app.config.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        uri: appConfigService.getDatabaseURI()
      }),
      inject: [AppConfigService]
    })
  ]
})
export class NoSqlModule {}
