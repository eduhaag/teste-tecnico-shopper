import { knex } from '../database'
import { Product } from '../model/Product'

interface UpdatePrice{
  code: number,
  sales_price: number,
  cost_price?: number
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

  public async updatePrice(data: UpdatePrice) {
    await knex(ProductsRepository.TABLE)
      .where('code', data.code)
      .update(data)
  }
}