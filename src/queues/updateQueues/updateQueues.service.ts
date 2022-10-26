import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Wallet, WalletDocument } from 'src/endpoints/wallets/schemas/wallet.schema';

@Injectable()
export class UpdateQueuesService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    @InjectQueue('updateQueues') private exampleQueue: Queue,
    @InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async startUpdateJobs() {
    const wallets: Wallet[] = await this.walletModel.find().exec();

    if (wallets.length < 1) {
      this.logger.warn('No wallets found when starting update jobs');
      return;
    }

    for (let i = 0; i < wallets.length; i++) {
      const wallet = wallets[i];

      await this.exampleQueue.add('updateBalance', wallet, {
        timeout: 60000,
        removeOnComplete: true,
        removeOnFail: true
      });

      await this.exampleQueue.add('updateNftAssets', wallet, {
        timeout: 60000,
        removeOnComplete: true,
        removeOnFail: true
      });
    }
  }
}
