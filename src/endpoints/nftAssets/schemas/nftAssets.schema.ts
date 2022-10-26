import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { AssetWithOrders } from '@imtbl/core-sdk';
import { ApiProperty } from '@nestjs/swagger';

export type NftAssetsDocument = NftAssets & Document;

@Schema()
export class NftAssets {
  @ApiProperty({ type: String })
  @Prop({ type: SchemaTypes.ObjectId })
  _id: ObjectId;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  walletId: string;

  // Collection name
  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  collectionId: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  collectionAddress: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  assetName: string;

  @ApiProperty({ type: Number })
  @Prop({ type: Number, required: true })
  assetQuantity: number;

  @ApiProperty({ type: Object, isArray: true, required: true })
  @Prop({ type: Array<AssetWithOrders>, required: true })
  assets: AssetWithOrders[];

  @ApiProperty({ type: Date, required: false })
  @Prop({ type: Date, select: false, default: Date.now(), expires: 600 })
  lastModifiedDate?: Date;
}

export const NftAssetsSchema = SchemaFactory.createForClass(NftAssets);

NftAssetsSchema.index({ walletId: 1, collectionId: 1, assetName: 1 }, { unique: true });
