import { AlchemyProvider } from '@ethersproject/providers';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppConfigService } from 'src/appConfig/app.config.service';
import { CreateWalletDto } from './dto/createWallet.dto';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
import { Wallet as EthersWallet } from '@ethersproject/wallet';
import { BaseSigner, generateStarkWallet } from '@imtbl/core-sdk';
import { UsersHelper } from 'src/apiWrappers/usersHelper';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { WalletFilter } from './filters/wallets.filter';
import { DeleteResult } from 'src/common/DeleteResult';
import { CreateNewWalletDto } from './dto/createNewWallet.dto';

@Injectable()
export class WalletsService {
  private readonly alchemyProvider: AlchemyProvider;
  private readonly usersHelper: UsersHelper;

  constructor(
    private readonly appConfigService: AppConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @InjectModel(Wallet.name) private readonly walletModel: Model<WalletDocument>
  ) {
    this.alchemyProvider = this.appConfigService.getAlchemyProvider();
    const coreSdkConfig = this.appConfigService.getCoreSdkConfig();
    this.usersHelper = new UsersHelper(coreSdkConfig);
  }

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    this.logger.log(
      `Creating wallet ${createWalletDto._id} with address: ${createWalletDto.address}`
    );
    return this.walletModel.create(createWalletDto);
  }

  async createAndRegisterWallet(createNewWalletDto: CreateNewWalletDto): Promise<Wallet> {
    const l1Signer = EthersWallet.createRandom().connect(this.alchemyProvider);
    const walletAddress = l1Signer.address;

    const starkWallet = await generateStarkWallet(l1Signer);
    const l2Signer = new BaseSigner(starkWallet.starkKeyPair);

    const walletConnection = { l1Signer, l2Signer };
    const registerResponse = await this.usersHelper.registerOffchain(walletConnection);

    const isWalletRegistered = await this.usersHelper.isWalletRegistered(walletAddress);

    if (isWalletRegistered) {
      this.logger.log(`Created wallet and registered successfully: ${walletAddress}`);
    } else {
      this.logger.warn(
        `Created wallet and failed to register: ${walletAddress}, Response: ${registerResponse?.data}`
      );
    }

    return this.create({
      _id: createNewWalletDto._id,
      address: walletAddress.toLowerCase(),
      l2Address: l2Signer.getAddress().toLowerCase(),
      publicKey: l1Signer.publicKey,
      privateKey: l1Signer.privateKey,
      mnemonic: l1Signer.mnemonic,
      balance: '0',
      registered: isWalletRegistered
    });
  }

  async find(filter: WalletFilter): Promise<Wallet[]> {
    return this.walletModel.find(filter).exec();
  }

  async count(filter: WalletFilter): Promise<number> {
    return this.walletModel.count(filter).exec();
  }

  async delete(filter: WalletFilter): Promise<DeleteResult> {
    this.logger.log(`Deleting wallets with filter ${JSON.stringify(filter)}`);
    return this.walletModel.deleteMany(filter).exec();
  }
}
