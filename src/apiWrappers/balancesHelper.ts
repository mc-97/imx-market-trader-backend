import { BalancesApi, ImmutableXConfiguration } from '@imtbl/core-sdk';

export class BalancesHelper {
  private readonly balancesApi: BalancesApi;

  constructor(protected config: ImmutableXConfiguration) {
    this.config = config;
    this.balancesApi = new BalancesApi(config.apiConfiguration);
  }

  public async getBalance(address: string) {
    const requestQuery = { owner: address, address: 'ETH' };
    const balance = await this.balancesApi.getBalance(requestQuery);

    if (balance && balance.data) return balance.data.balance ?? '0';
    return '0';
  }
}
