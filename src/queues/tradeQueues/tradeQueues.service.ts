import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
  LimitOrder,
  LimitOrderDocument,
  LimitOrderType
} from 'src/endpoints/limitOrders/schemas/limitOrder.schema';

@Injectable()
export class TradeQueuesService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    @InjectQueue('tradeQueues') private exampleQueue: Queue,
    @InjectModel(LimitOrder.name) private readonly limitOrderModel: Model<LimitOrderDocument>
  ) {
    this.logger = new Logger(TradeQueuesService.name);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async startTradeJob() {
    const limitOrders: LimitOrder[] = await this.limitOrderModel.find().exec();

    if (limitOrders.length < 1) {
      this.logger.warn('No limit orders found when starting trade jobs');
      return;
    }

    for (let i = 0; i < limitOrders.length; i++) {
      const limitOrder = limitOrders[i];
      const priority = limitOrder.orderType === LimitOrderType.Buy ? 1 : 2;
      await this.exampleQueue.add('tradeJob', limitOrder, {
        priority: priority,
        timeout: 60000,
        removeOnComplete: true,
        removeOnFail: true
      });
    }
  }
}
