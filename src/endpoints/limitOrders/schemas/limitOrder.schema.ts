import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LimitOrderDocument = LimitOrder & Document;

export enum LimitOrderType {
  Buy = 'Buy',
  Sell = 'Sell'
}

@Schema()
export class LimitOrder {
  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.ObjectId })
  _id: ObjectId;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  walletId: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  walletAddress: string;

  @ApiProperty({ type: String })
  // Collection name
  @Prop({ type: String, required: true })
  collectionId: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  collectionAddress: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  assetName: string;

  @ApiProperty({ enum: LimitOrderType })
  @Prop({ enum: LimitOrderType, required: true, index: true })
  orderType: LimitOrderType;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  priceLevel: string;

  @ApiProperty({ type: Number })
  @Prop({ type: Number, required: true, default: 2 })
  priceLevelMultiplier?: number;

  @ApiProperty({ type: Number })
  @Prop({ type: Number, required: true })
  feesPercent: number;

  @ApiProperty({ type: Number })
  @Prop({ type: Number, required: true })
  maxQuantity: number;
}

export const LimitOrderSchema = SchemaFactory.createForClass(LimitOrder);

LimitOrderSchema.index(
  { walletId: 1, collectionId: 1, assetName: 1, orderType: 1 },
  { unique: true }
);
