import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Collection, CollectionSchema } from 'src/endpoints/collections/schemas/collection.schema';
import { NftAssets, NftAssetsSchema } from 'src/endpoints/nftAssets/schemas/nftAssets.schema';
import { Wallet, WalletSchema } from 'src/endpoints/wallets/schemas/wallet.schema';
import { NoSqlModule } from 'src/nosql/noSql.module';
import { BullQueueModule } from '../bullQueue.module';
import { UpdateQueuesProcessor } from './updateQueues.processor';
import { UpdateQueuesService } from './updateQueues.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullQueueModule,
    BullModule.registerQueue({
      name: 'updateQueues'
    }),
    NoSqlModule,
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
      { name: NftAssets.name, schema: NftAssetsSchema },
      { name: Wallet.name, schema: WalletSchema }
    ])
  ],
  providers: [UpdateQueuesProcessor, UpdateQueuesService]
})
export class UpdateQueuesModule {}
