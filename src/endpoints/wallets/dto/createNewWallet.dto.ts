import { ApiProperty } from '@nestjs/swagger';

export class CreateNewWalletDto {
  @ApiProperty({ type: String })
  readonly _id: string;
}
