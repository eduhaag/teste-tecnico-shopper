import { knex } from "../database"

interface UpdatePrice{
  productId: number,
  newPrice: number
}

export class ProductsDatabase  {
  private static TABLE = 'products'

  public async listProductsByIds(ids: number[]) {
    const products = await knex(ProductsDatabase.TABLE)
      .select('*')
      .whereIn('code', ids)

    return products
  }

  public async updatePrice({productId, newPrice}: UpdatePrice) {
    const product = await knex(ProductsDatabase.TABLE)
      .where(productId)
      .update({'sales_price': newPrice})
  }
}