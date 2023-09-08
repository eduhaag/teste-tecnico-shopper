import { knex } from "../database"
import { Product } from "../model/Product"

interface UpdatePrice{
  productId: number,
  newPrice: number
}

export class ProductsRepository  {
  private static TABLE = 'products'

  public async listProductsByIds(ids: number[]): Promise<Product[]>{
    const response = await knex(ProductsRepository.TABLE)
      .select('*')
      .whereIn('code', ids)
    
    const products = response.map(item => {
      return new Product(item.code, item.name, item.cost_price, item.sales_price)
    })

    return products
  }

  public async updatePrice({productId, newPrice}: UpdatePrice) {
    const product = await knex(ProductsRepository.TABLE)
      .where(productId)
      .update({'sales_price': newPrice})
  }
}