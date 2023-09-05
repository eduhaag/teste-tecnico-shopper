import { Database } from "./Database";

interface UpdatePrice{
  productId: number,
  newPrice: number
}

export class ProductsDatabase extends Database {
  private static TABLE = 'products'

  public async listProductsByIds(ids: number[]){
    const products = await Database.connection()
      .select('*')
      .from(ProductsDatabase.TABLE)
      .whereIn('code', ids)

    return products
  }

  public async updatePrice({productId, newPrice}: UpdatePrice){
    const product = await Database.connection()
      .where(productId)
      .update({'sales_price': newPrice})
  }
}