import { AlchemyProvider } from '@ethersproject/providers';
import { WalletConnection, Workflows } from '@imtbl/core-sdk';
import { Process, Processor } from '@nestjs/bull';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppConfigService } from 'src/appConfig/app.config.service';
import { buildWalletConnection } from 'src/builders/buildWalletConnection';
import { LimitOrder, LimitOrderType } from 'src/endpoints/limitOrders/schemas/limitOrder.schema';
import { NftAssets, NftAssetsDocument } from 'src/endpoints/nftAssets/schemas/nftAssets.schema';
import { Wallet, WalletDocument } from 'src/endpoints/wallets/schemas/wallet.schema';

@Injectable()
@Processor('tradeQueues')
export class TradeQueuesProcessor {
  private readonly alchemyProvider: AlchemyProvider;
  private readonly coreSdkWorkflows: Workflows;

  constructor(
    private readonly appConfigService: AppConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @InjectModel(NftAssets.name) private readonly nftAssetsModel: Model<NftAssetsDocument>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>
  ) {
    this.alchemyProvider = this.appConfigService.getAlchemyProvider();
    const coreSdkConfig = this.appConfigService.getCoreSdkConfig();
    this.coreSdkWorkflows = new Workflows(coreSdkConfig);
  }

  @Process({ name: 'tradeJob', concurrency: 2 })
  async handleTradeJob(job: Job<LimitOrder>) {
    if (job.data.orderType === LimitOrderType.Buy) {
      await this.handleBuyJob(job);
    } else if (job.data.orderType === LimitOrderType.Sell) {
      await this.handleSellJob(job);
    }
  }

  async handleBuyJob(job: Job<LimitOrder>) {
    return;
  }

  async handleSellJob(job: Job<LimitOrder>) {
    return;
  }

  async getWalletConnection(walletId: string): Promise<WalletConnection | null> {
    const wallet = await this.walletModel.findById(walletId).select('privateKey').exec();
    if (wallet) {
      return buildWalletConnection(wallet.privateKey, this.alchemyProvider);
    }
    return null;
  }
}
