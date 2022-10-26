import { LimitOrderType } from '../schemas/limitOrder.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLimitOrderDto {
  @ApiProperty({ type: String })
  walletId: string;

  @ApiProperty({ type: String, required: false })
  walletAddress?: string;

  @ApiProperty({ type: String })
  collectionId: string;

  @ApiProperty({ type: String, required: false })
  collectionAddress?: string;

  @ApiProperty({ type: String })
  assetName: string;

  @ApiProperty({ enum: LimitOrderType })
  orderType: LimitOrderType;

  @ApiProperty({ type: String })
  priceLevel: string;

  @ApiProperty({ type: Number, required: false })
  priceLevelMultiplier?: number;

  @ApiProperty({ type: Number })
  feesPercent: number;

  @ApiProperty({ type: Number })
  maxQuantity: number;
}
