import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LimitOrdersController } from './limitOrders.controller';
import { LimitOrdersService } from './limitOrders.service';
import { LimitOrder, LimitOrderSchema } from './schemas/limitOrder.schema';
import { NoSqlModule } from 'src/nosql/noSql.module';
import { Collection, CollectionSchema } from '../collections/schemas/collection.schema';
import { Wallet, WalletSchema } from '../wallets/schemas/wallet.schema';

@Module({
  imports: [
    NoSqlModule,
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
      { name: LimitOrder.name, schema: LimitOrderSchema },
      { name: Wallet.name, schema: WalletSchema }
    ])
  ],
  controllers: [LimitOrdersController],
  providers: [LimitOrdersService],
  exports: [LimitOrdersService]
})
export class LimitOrdersModule {}
