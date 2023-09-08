import { knex } from "../database"
import { Pack } from "../model/Pack"
import { Product } from "../model/Product"

export class PacksRepository {
  private static TABLE = 'packs'

  public async getPackById(packId: number): Promise<Pack | undefined>{
    const response = await knex(PacksRepository.TABLE)
      .select('*')
      .join('products', 'packs.product_id', '=', 'products.code')
      .where('pack_id', packId)

    if(response.length > 0) {
      const packProducts = response.map(item => {
        return {
          product: new Product(item.code, item.name, item.cost_price, item.sales_price),
          qty: item.qty
        }
      })
      
      return new Pack(response[0].id, response[0].pack_id, packProducts)
    }

    return
  }

  public async getPacksByProductId(productId: number): Promise<Pack[]> {
    const response = await knex(PacksRepository.TABLE)
      .select('*')
      .where({product_id: productId})

    if(response.length > 0) {
      return Promise.all(response.map(async item => {
        const productsResponse = await knex(PacksRepository.TABLE)
          .select('products.*')
          .join('products', 'packs.product_id', '=', 'products.code')
          .where({pack_id: item.pack_id})
  
        const packProducts = productsResponse.map(product => {
          return {
            product: new Product(
              product.code, 
              product.name, 
              product.cost_price, 
              product.sales_price),
            qty: item.qty
          }
        })
        
        return new Pack(item.id, item.pack_id, packProducts)
      }))
    }
    
    return []
  }
}