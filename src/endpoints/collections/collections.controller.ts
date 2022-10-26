import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'src/common/DeleteResult';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/createCollection.dto';
import { CollectionFilter } from './filters/collection.filter';
import { Collection } from './schemas/collection.schema';

@ApiTags('collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create collection' })
  @ApiOkResponse({ type: Collection, isArray: true })
  async create(@Body() createCollectionDto: CreateCollectionDto): Promise<Collection[]> {
    await this.collectionsService.create(createCollectionDto);
    return this.collectionsService.find({ _id: createCollectionDto._id });
  }

  @Get('')
  @ApiOperation({ summary: 'Find collections' })
  @ApiOkResponse({ type: Collection, isArray: true })
  @ApiQuery({ name: 'collectionId', required: false })
  @ApiQuery({ name: 'collectionAddress', required: false })
  async find(
    @Query('collectionId') collectionId?: string,
    @Query('collectionAddress') collectionAddress?: string
  ): Promise<Collection[]> {
    return this.collectionsService.find(
      new CollectionFilter({ _id: collectionId, collectionAddress })
    );
  }

  @Get('/count')
  @ApiOperation({ summary: 'Count collections' })
  @ApiOkResponse({ type: Number })
  @ApiQuery({ name: 'collectionId', required: false })
  @ApiQuery({ name: 'collectionAddress', required: false })
  async count(
    @Query('collectionId') collectionId?: string,
    @Query('collectionAddress') collectionAddress?: string
  ): Promise<number> {
    return this.collectionsService.count(
      new CollectionFilter({ _id: collectionId, collectionAddress })
    );
  }

  @Delete('')
  @ApiOperation({ summary: 'Delete collections' })
  @ApiOkResponse({ type: DeleteResult })
  @ApiQuery({ name: 'collectionId', required: true })
  @ApiQuery({ name: 'collectionAddress', required: false })
  async delete(
    @Query('collectionId') collectionId: string,
    @Query('collectionAddress') collectionAddress?: string
  ): Promise<DeleteResult> {
    return this.collectionsService.delete(
      new CollectionFilter({ _id: collectionId, collectionAddress })
    );
  }
}
