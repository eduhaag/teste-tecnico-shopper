import { Product } from './Product'

export class Pack {
  constructor(
    private _id: number,
    private _packId: number,
    private _packProducts: {
      product: Product,
      qty: number
    }[]
  ) {}

  packId() {
    return this._packId
  }

  packProducts() {
    return this._packProducts
  }
}