import { SignableToken } from '@imtbl/core-sdk';

export interface SignableTokenData {
  decimals?: number;
  token_address?: string;
  token_id?: string;
}

export enum SignableTokenType {
  ETH = 'ETH',
  ERC20 = 'ERC20',
  ERC721 = 'ERC721'
}

export const buildSignableToken = (
  type: SignableTokenType,
  data: SignableTokenData
): SignableToken => {
  return { type: type, data: data };
};
