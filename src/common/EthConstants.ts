import { SignableToken } from '@imtbl/core-sdk';
import BigNumber from 'bignumber.js';

export const EthSignableToken: SignableToken = {
  type: 'ETH',
  data: {
    decimals: 18
  }
};

export const OneEth = BigNumber('1000000000000000000');

export const FiveMillionthEth = BigNumber('5000000000000');

export const OneMillionthEth = BigNumber('1000000000000');
