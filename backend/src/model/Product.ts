export class Product {
  constructor(
    private _code: number,
    private _name: string,
    private _cost: number,
    private _price: number
  ) {}

  code() {
    return this._code
  }

  name() {
    return this._name
  }

  cost() {
    return this._cost
  }

  price() {
    return this._price
  }

  
}