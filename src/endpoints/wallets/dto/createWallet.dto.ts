import { ApiProperty } from '@nestjs/swagger';
import { Mnemonic } from '../schemas/wallet.schema';

export class CreateWalletDto {
  @ApiProperty({ type: String })
  readonly _id: string;

  @ApiProperty({ type: String })
  readonly address: string;

  @ApiProperty({ type: String })
  readonly l2Address: string;

  @ApiProperty({ type: String })
  readonly publicKey: string;

  @ApiProperty({ type: String })
  readonly privateKey: string;

  @ApiProperty({ type: Mnemonic })
  readonly mnemonic: Mnemonic;

  @ApiProperty({ type: String })
  readonly balance: string;

  @ApiProperty({ type: String })
  readonly registered: boolean;
}
