import { LimitOrderType } from '../schemas/limitOrder.schema';

export class LimitOrderFilter {
  constructor(init?: Partial<LimitOrderFilter>) {
    if (init !== undefined) {
      for (const [key, value] of Object.entries(init)) {
        if (value === undefined) {
          //@ts-ignore
          delete init[key];
        }
      }
    }
    Object.assign(this, init);
  }

  walletId?: string;
  collectionId?: string;
  assetName?: string;
  orderType?: LimitOrderType;
}
