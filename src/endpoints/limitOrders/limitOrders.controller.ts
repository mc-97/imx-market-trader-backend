import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { LimitOrdersService } from './limitOrders.service';
import { CreateLimitOrderDto } from './dto/createLimitOrder.dto';
import { LimitOrder, LimitOrderType } from './schemas/limitOrder.schema';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LimitOrderFilter } from './filters/limitOrder.filter';
import { DeleteResult } from 'src/common/DeleteResult';
import { ParseOptionalEnumPipe } from 'src/common/parseOptionalEnum.pipe';

@ApiTags('limit-orders')
@Controller('limit-orders')
export class LimitOrdersController {
  constructor(private readonly limitOrdersService: LimitOrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create limit order' })
  @ApiOkResponse({ type: LimitOrder })
  async create(@Body() createLimitOrderDto: CreateLimitOrderDto): Promise<LimitOrder | null> {
    return this.limitOrdersService.create(createLimitOrderDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Find limit orders' })
  @ApiOkResponse({ type: LimitOrder, isArray: true })
  @ApiQuery({ name: 'walletId', required: false })
  @ApiQuery({ name: 'collectionId', required: false })
  @ApiQuery({ name: 'assetName', required: false })
  @ApiQuery({ name: 'orderType', enum: LimitOrderType, required: false })
  async find(
    @Query('walletId') walletId?: string,
    @Query('collectionId') collectionId?: string,
    @Query('assetName') assetName?: string,
    @Query('orderType', new ParseOptionalEnumPipe(LimitOrderType)) orderType?: LimitOrderType
  ): Promise<LimitOrder[]> {
    return this.limitOrdersService.find(
      new LimitOrderFilter({ walletId, collectionId, assetName, orderType })
    );
  }

  @Get('/count')
  @ApiOperation({ summary: 'Count limit orders' })
  @ApiOkResponse({ type: Number })
  @ApiQuery({ name: 'walletId', required: false })
  @ApiQuery({ name: 'collectionId', required: false })
  @ApiQuery({ name: 'assetName', required: false })
  @ApiQuery({ name: 'orderType', enum: LimitOrderType, required: false })
  async count(
    @Query('walletId') walletId?: string,
    @Query('collectionId') collectionId?: string,
    @Query('assetName') assetName?: string,
    @Query('orderType', new ParseOptionalEnumPipe(LimitOrderType))
    orderType?: LimitOrderType
  ): Promise<number> {
    return this.limitOrdersService.count(
      new LimitOrderFilter({ walletId, collectionId, assetName, orderType })
    );
  }

  @Delete('')
  @ApiOperation({ summary: 'Delete limit orders' })
  @ApiOkResponse({ type: DeleteResult })
  @ApiQuery({ name: 'walletId', required: true })
  @ApiQuery({ name: 'collectionId', required: false })
  @ApiQuery({ name: 'assetName', required: false })
  @ApiQuery({ name: 'orderType', enum: LimitOrderType, required: false })
  async deleteLimitOrders(
    @Query('walletId') walletId: string,
    @Query('collectionId') collectionId?: string,
    @Query('assetName') assetName?: string,
    @Query('orderType', new ParseOptionalEnumPipe(LimitOrderType)) orderType?: LimitOrderType
  ): Promise<DeleteResult> {
    return this.limitOrdersService.delete(
      new LimitOrderFilter({ walletId, collectionId, assetName, orderType })
    );
  }
}
