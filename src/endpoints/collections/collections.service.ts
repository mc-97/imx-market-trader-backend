import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCollectionDto } from './dto/createCollection.dto';
import { Collection, CollectionDocument } from './schemas/collection.schema';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CollectionFilter } from './filters/collection.filter';
import { DeleteResult } from 'src/common/DeleteResult';

@Injectable()
export class CollectionsService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @InjectModel(Collection.name) private readonly collectionModel: Model<CollectionDocument>
  ) {}

  async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    this.logger.log(
      `Creating collection ${createCollectionDto._id} with address ${createCollectionDto.collectionAddress}`
    );
    return this.collectionModel.create(createCollectionDto);
  }

  async find(filter: CollectionFilter): Promise<Collection[]> {
    return this.collectionModel.find(filter).exec();
  }

  async count(filter: CollectionFilter): Promise<number> {
    return this.collectionModel.count(filter).exec();
  }

  async delete(filter: CollectionFilter): Promise<DeleteResult> {
    this.logger.log(`Deleting collections with filter ${JSON.stringify(filter)}`);
    return this.collectionModel.deleteMany(filter).exec();
  }
}
