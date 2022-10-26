import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app.config.service';
import configuration from '../../config/configuration';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  providers: [AppConfigService],
  exports: [AppConfigService]
})
export class AppConfigModule {}
