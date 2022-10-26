import { Signer } from '@ethersproject/abstract-signer';
import { ImmutableXConfiguration, UsersApi, WalletConnection } from '@imtbl/core-sdk';
import { isUserRegistered, registerOffchainWorkflow } from './registration';

export class UsersHelper {
  private readonly usersApi: UsersApi;

  constructor(protected config: ImmutableXConfiguration) {
    this.config = config;
    this.usersApi = new UsersApi(config.apiConfiguration);
  }

  private isChainValid(chainID: number) {
    return chainID === this.config.l1Configuration.chainID;
  }

  private async validateChain(signer: Signer) {
    const chainID = await signer.getChainId();

    if (!this.isChainValid(chainID))
      throw new Error('The wallet used for this operation is not from the correct network.');
  }

  public async registerOffchain(walletConnection: WalletConnection) {
    await this.validateChain(walletConnection.l1Signer);

    return registerOffchainWorkflow({
      ...walletConnection,
      usersApi: this.usersApi
    });
  }

  public async isWalletRegistered(address: string) {
    return isUserRegistered(address, this.usersApi);
  }
}
