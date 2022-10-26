import { ApiProperty } from '@nestjs/swagger';

export class DeleteResult {
  @ApiProperty({ type: Boolean })
  acknowledged: boolean;

  @ApiProperty({ type: Number })
  deletedCount: number;
}
