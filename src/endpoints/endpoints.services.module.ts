import { Module } from '@nestjs/common';
import { CollectionsModule } from './collections/collections.module';
import { LimitOrdersModule } from './limitOrders/limitOrders.module';
import { NftAssetsModule } from './nftAssets/nftAssets.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [CollectionsModule, LimitOrdersModule, NftAssetsModule, WalletsModule],
  exports: [CollectionsModule, LimitOrdersModule, NftAssetsModule, WalletsModule]
})
export class EndpointsServicesModule {}
