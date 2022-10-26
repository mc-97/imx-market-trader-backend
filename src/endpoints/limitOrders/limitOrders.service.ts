import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLimitOrderDto } from './dto/createLimitOrder.dto';
import { LimitOrder, LimitOrderDocument } from './schemas/limitOrder.schema';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Collection, CollectionDocument } from '../collections/schemas/collection.schema';
import { Wallet, WalletDocument } from '../wallets/schemas/wallet.schema';
import { LimitOrderFilter } from './filters/limitOrder.filter';
import { DeleteResult } from 'src/common/DeleteResult';

@Injectable()
export class LimitOrdersService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @InjectModel(Collection.name) private readonly collectionModel: Model<CollectionDocument>,
    @InjectModel(LimitOrder.name) private readonly limitOrderModel: Model<LimitOrderDocument>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>
  ) {}

  async create(createLimitOrderDto: CreateLimitOrderDto): Promise<LimitOrder | null> {
    if (createLimitOrderDto.walletAddress === undefined) {
      const wallet = await this.walletModel.findById(createLimitOrderDto.walletId);
      if (wallet) {
        createLimitOrderDto.walletAddress = wallet.address;
      } else {
        this.logger.log(
          `Failed to create order for ${createLimitOrderDto.walletId}, missing wallet address`
        );
        return null;
      }
    }

    if (createLimitOrderDto.collectionAddress === undefined) {
      const collection = await this.collectionModel.findById(createLimitOrderDto.collectionId);
      if (collection) {
        createLimitOrderDto.collectionAddress = collection.collectionAddress;
      } else {
        this.logger.log(
          `Failed to create order for ${createLimitOrderDto.walletId} collection ${createLimitOrderDto.collectionId}, missing collection address`
        );
        return null;
      }
    }

    this.logger.log(
      `Creating ${createLimitOrderDto.orderType} order for ${createLimitOrderDto.walletId} for ${createLimitOrderDto.assetName} from ${createLimitOrderDto.collectionId}`
    );
    const filter: LimitOrderFilter = {
      walletId: createLimitOrderDto.walletId,
      collectionId: createLimitOrderDto.collectionId,
      assetName: createLimitOrderDto.assetName,
      orderType: createLimitOrderDto.orderType
    };
    await this.limitOrderModel.replaceOne(filter, createLimitOrderDto, { upsert: true }).exec();
    return this.limitOrderModel.findOne(filter).exec();
  }

  async find(filter: LimitOrderFilter): Promise<LimitOrder[]> {
    return this.limitOrderModel.find(filter).exec();
  }

  async count(filter: LimitOrderFilter): Promise<number> {
    return this.limitOrderModel.count(filter).exec();
  }

  async delete(filter: LimitOrderFilter): Promise<DeleteResult> {
    this.logger.log(`Deleting limit orders with filter ${JSON.stringify(filter)}`);
    return this.limitOrderModel.deleteMany(filter).exec();
  }
}
