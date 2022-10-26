import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { Collection, CollectionSchema } from './schemas/collection.schema';
import { NoSqlModule } from 'src/nosql/noSql.module';

@Module({
  imports: [
    NoSqlModule,
    MongooseModule.forFeature([{ name: Collection.name, schema: CollectionSchema }])
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService],
  exports: [CollectionsService]
})
export class CollectionsModule {}
