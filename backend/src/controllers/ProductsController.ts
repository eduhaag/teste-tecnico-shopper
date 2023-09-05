import { ProductsDatabase } from "../database/ProductsDatabase";

export class ProductsController {
  constructor (
    private productDatabase: ProductsDatabase
  ){}

  async getProducts(ids: number[]){
    return await this.productDatabase.listProductsByIds(ids)
  }
}