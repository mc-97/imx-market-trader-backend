import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema({ _id: false })
export class Mnemonic {
  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  phrase: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  path: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  locale: string;
}

@Schema({ collation: { locale: 'en_US', numericOrdering: true } })
export class Wallet {
  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  _id: string;

  // ETH Wallet Address
  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  address: string;

  // L2 Wallet Address
  @ApiProperty({ type: String, required: false })
  @Prop({ type: String, required: true, select: false })
  l2Address: string;

  @ApiProperty({ type: String, required: false })
  @Prop({ type: String, required: true, select: false })
  publicKey: string;

  @ApiProperty({ type: String, required: false })
  @Prop({ type: String, required: true, select: false })
  privateKey: string;

  @ApiProperty({ type: Mnemonic, required: false })
  @Prop({ type: Mnemonic, required: true, select: false })
  mnemonic: Mnemonic;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  balance: string;

  @ApiProperty({ type: String, required: false })
  @Prop({ type: Boolean, required: true, select: false })
  registered: boolean;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
