export class WalletFilter {
  constructor(init?: Partial<WalletFilter>) {
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

  _id?: string;
}
