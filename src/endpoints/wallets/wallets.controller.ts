import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/createWallet.dto';
import { Wallet } from './schemas/wallet.schema';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { WalletFilter } from './filters/wallets.filter';
import { DeleteResult } from 'src/common/DeleteResult';
import { CreateNewWalletDto } from './dto/createNewWallet.dto';

@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @ApiOperation({ summary: 'Create Wallet' })
  @ApiOkResponse({ type: Wallet, isArray: true })
  async create(@Body() createWalletDto: CreateWalletDto): Promise<Wallet[] | null> {
    await this.walletsService.create(createWalletDto);
    return this.walletsService.find(new WalletFilter({ _id: createWalletDto._id }));
  }

  @Post('/create-and-register/')
  @ApiOperation({ summary: 'Create new wallet and register' })
  @ApiOkResponse({ type: Wallet, isArray: true })
  async createAndRegisterWallet(
    @Body() createNewWalletDto: CreateNewWalletDto
  ): Promise<Wallet[] | null> {
    await this.walletsService.createAndRegisterWallet(createNewWalletDto);
    return this.walletsService.find(new WalletFilter({ _id: createNewWalletDto._id }));
  }

  @Get('')
  @ApiOperation({ summary: 'Find wallets' })
  @ApiOkResponse({ type: Wallet, isArray: true })
  @ApiQuery({ name: 'walletId', required: false })
  async find(@Query('walletId') walletId?: string): Promise<Wallet[]> {
    return this.walletsService.find(new WalletFilter({ _id: walletId }));
  }

  @Get('/count')
  @ApiOperation({ summary: 'Count wallets' })
  @ApiOkResponse({ type: Number })
  @ApiQuery({ name: 'walletId', required: false })
  async count(@Query('walletId') walletId?: string): Promise<number> {
    return this.walletsService.count(new WalletFilter({ _id: walletId }));
  }

  @Delete('')
  @ApiOperation({ summary: 'Delete wallets' })
  @ApiOkResponse({ type: DeleteResult })
  @ApiQuery({ name: 'walletId', required: true })
  async delete(@Query('walletId') walletId: string): Promise<DeleteResult> {
    return this.walletsService.delete(new WalletFilter({ _id: walletId }));
  }
}
