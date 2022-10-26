import { GetSignableTradeRequest } from '@imtbl/core-sdk';

export const buildTradeRequest = (orderId: number, address: string): GetSignableTradeRequest => {
  return { order_id: orderId, user: address };
};
