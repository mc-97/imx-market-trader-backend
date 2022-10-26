import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NftAssetsFilter } from './filters/nftAssets.filter';
import { NftAssetsService } from './nftAssets.service';
import { NftAssets } from './schemas/nftAssets.schema';

@ApiTags('nft-assets')
@Controller('nft-assets')
export class NftAssetsController {
  constructor(private readonly nftAssetsService: NftAssetsService) {}

  @Get('')
  @ApiOperation({ summary: 'Find nft assets' })
  @ApiOkResponse({ type: NftAssets, isArray: true })
  @ApiQuery({ name: 'walletId', required: false })
  @ApiQuery({ name: 'collectionId', required: false })
  @ApiQuery({ name: 'assetName', required: false })
  async findNftAssets(
    @Query('walletId') walletId?: string,
    @Query('collectionId') collectionId?: string,
    @Query('assetName') assetName?: string
  ): Promise<NftAssets[]> {
    return this.nftAssetsService.find(new NftAssetsFilter({ walletId, collectionId, assetName }));
  }

  @Get('/count')
  @ApiOperation({ summary: 'Count nft assets' })
  @ApiOkResponse({ type: Number })
  @ApiQuery({ name: 'walletId', required: false })
  @ApiQuery({ name: 'collectionId', required: false })
  @ApiQuery({ name: 'assetName', required: false })
  async count(
    @Query('walletId') walletId?: string,
    @Query('collectionId') collectionId?: string,
    @Query('assetName') assetName?: string
  ): Promise<number> {
    return this.nftAssetsService.count(new NftAssetsFilter({ walletId, collectionId, assetName }));
  }
}
