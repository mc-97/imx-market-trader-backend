export class NftAssetsFilter {
  constructor(init?: Partial<NftAssetsFilter>) {
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
}
