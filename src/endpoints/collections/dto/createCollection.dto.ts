import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty({ type: String })
  readonly _id: string;

  @ApiProperty({ type: String })
  readonly collectionAddress: string;
}
