import { signRaw, UsersApi, WalletConnection } from '@imtbl/core-sdk';

type registerOffchainWorkflowParams = WalletConnection & {
  usersApi: UsersApi;
};

export async function isUserRegistered(userAddress: string, usersApi: UsersApi): Promise<boolean> {
  try {
    await usersApi.getUsers({ user: userAddress });
    return true;
  } catch (error) {
    return false;
  }
}

export async function registerOffchainWorkflow({
  l1Signer,
  l2Signer,
  usersApi
}: registerOffchainWorkflowParams): Promise<any> {
  const userAddress = await l1Signer.getAddress();
  const starkPublicKey = await l2Signer.getAddress();

  if (await isUserRegistered(userAddress, usersApi)) {
    return;
  }

  const signableResult = await usersApi.getSignableRegistrationOffchain({
    getSignableRegistrationRequest: {
      ether_key: userAddress,
      stark_key: starkPublicKey
    }
  });

  const { signable_message: signableMessage, payload_hash: payloadHash } = signableResult.data;

  const ethSignature = await signRaw(signableMessage, l1Signer);

  const starkSignature = await l2Signer.signMessage(payloadHash);

  return await usersApi.registerUser({
    registerUserRequest: {
      eth_signature: ethSignature,
      ether_key: userAddress,
      stark_signature: starkSignature,
      stark_key: starkPublicKey
    }
  });
}
