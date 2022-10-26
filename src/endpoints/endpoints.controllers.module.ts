import { Module } from '@nestjs/common';
import { CollectionsController } from './collections/collections.controller';
import { EndpointsServicesModule } from './endpoints.services.module';
import { LimitOrdersController } from './limitOrders/limitOrders.controller';
import { NftAssetsController } from './nftAssets/nftAssets.controller';
import { WalletsController } from './wallets/wallets.controller';

@Module({
  imports: [EndpointsServicesModule],
  controllers: [
    CollectionsController,
    LimitOrdersController,
    NftAssetsController,
    WalletsController
  ]
})
export class EndpointsControllersModule {}
