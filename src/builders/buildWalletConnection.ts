import { AlchemyProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { BaseSigner, generateStarkWallet, WalletConnection } from '@imtbl/core-sdk';

export const buildWalletConnection = async (
  privateKey: string,
  alchemyProvider: AlchemyProvider
): Promise<WalletConnection> => {
  const l1Signer = new Wallet(privateKey).connect(alchemyProvider);
  const starkWallet = await generateStarkWallet(l1Signer);
  const l2Signer = new BaseSigner(starkWallet.starkKeyPair);
  const walletConnection: WalletConnection = { l1Signer, l2Signer };
  return walletConnection;
};
