import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CollectionDocument = Collection & Document;

@Schema()
export class Collection {
  // Collection name
  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  _id: string;

  @ApiProperty({ type: String })
  @Prop({ type: String, required: true })
  collectionAddress: string;
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
