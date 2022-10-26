import { Process, Processor } from '@nestjs/bull';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import BigNumber from 'bignumber.js';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppConfigService } from 'src/appConfig/app.config.service';
import { Wallet, WalletDocument } from 'src/endpoints/wallets/schemas/wallet.schema';
import { BalancesHelper } from 'src/apiWrappers/balancesHelper';

@Injectable()
@Processor('updateQueues')
export class UpdateQueuesProcessor {
  private readonly balancesHelper: BalancesHelper;

  constructor(
    private readonly appConfigService: AppConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>
  ) {
    const coreSdkConfig = this.appConfigService.getCoreSdkConfig();
    this.balancesHelper = new BalancesHelper(coreSdkConfig);
  }

  @Process({ name: 'updateBalance', concurrency: 1 })
  async handleUpdateBalance(job: Job<Wallet>) {
    const newBalance = await this.balancesHelper.getBalance(job.data.address);
    if (job.data.balance !== newBalance) {
      await this.walletModel
        .findByIdAndUpdate(job.data._id, { $set: { balance: newBalance } })
        .exec();
      this.logger.log(
        `Updating balance for ${job.data._id} from ${BigNumber(job.data.balance).shiftedBy(
          -18
        )} ETH to ${BigNumber(newBalance).shiftedBy(-18)} ETH`
      );
    }
  }

  @Process({ name: 'updateNftAssets', concurrency: 1 })
  async handleUpdateNftAssets(job: Job<Wallet>) {
    return;
  }
}
