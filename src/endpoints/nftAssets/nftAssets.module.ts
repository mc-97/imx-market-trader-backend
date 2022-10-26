import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NftAssetsController } from './nftAssets.controller';
import { NftAssetsService } from './nftAssets.service';
import { NftAssets, NftAssetsSchema } from './schemas/nftAssets.schema';
import { NoSqlModule } from 'src/nosql/noSql.module';

@Module({
  imports: [
    NoSqlModule,
    MongooseModule.forFeature([{ name: NftAssets.name, schema: NftAssetsSchema }])
  ],
  controllers: [NftAssetsController],
  providers: [NftAssetsService],
  exports: [NftAssetsService]
})
export class NftAssetsModule {}
