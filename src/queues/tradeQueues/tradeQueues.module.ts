import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { LimitOrder, LimitOrderSchema } from 'src/endpoints/limitOrders/schemas/limitOrder.schema';
import { NftAssets, NftAssetsSchema } from 'src/endpoints/nftAssets/schemas/nftAssets.schema';
import { Wallet, WalletSchema } from 'src/endpoints/wallets/schemas/wallet.schema';
import { NoSqlModule } from 'src/nosql/noSql.module';
import { BullQueueModule } from '../bullQueue.module';
import { TradeQueuesProcessor } from './tradeQueues.processor';
import { TradeQueuesService } from './tradeQueues.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullQueueModule,
    BullModule.registerQueue({
      name: 'tradeQueues'
    }),
    NoSqlModule,
    MongooseModule.forFeature([
      { name: LimitOrder.name, schema: LimitOrderSchema },
      { name: NftAssets.name, schema: NftAssetsSchema },
      { name: Wallet.name, schema: WalletSchema }
    ])
  ],
  providers: [TradeQueuesProcessor, TradeQueuesService]
})
export class TradeQueuesModule {}
