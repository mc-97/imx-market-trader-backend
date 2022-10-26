import { Module } from '@nestjs/common';
import { TradeQueuesModule } from './tradeQueues/tradeQueues.module';
import { UpdateQueuesModule } from './updateQueues/updateQueues.module';

@Module({
  imports: [UpdateQueuesModule, TradeQueuesModule],
  exports: [UpdateQueuesModule, TradeQueuesModule]
})
export class QueuesServicesModule {}
