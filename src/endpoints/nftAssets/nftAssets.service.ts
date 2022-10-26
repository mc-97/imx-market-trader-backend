import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NftAssets, NftAssetsDocument } from './schemas/nftAssets.schema';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NftAssetsFilter } from './filters/nftAssets.filter';

@Injectable()
export class NftAssetsService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @InjectModel(NftAssets.name) private readonly nftAssetsModel: Model<NftAssetsDocument>
  ) {}

  async find(filter: NftAssetsFilter): Promise<NftAssets[]> {
    return this.nftAssetsModel.find(filter).exec();
  }

  async count(filter: NftAssetsFilter): Promise<number> {
    return this.nftAssetsModel.count(filter).exec();
  }
}
