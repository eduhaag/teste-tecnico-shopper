import { knex } from "../database"

export class PackagesDatabase {
  private static TABLE = 'packs'

  public async getPackItens(packId: number){
    const packs = await knex(PackagesDatabase.TABLE)
      .select('*')
      .where('pack_id', packId)

    return packs
  }

  public async getPacksByProduct(productId: number) {
    const packs = await knex(PackagesDatabase.TABLE)
      .select('*')
      .where({product_id: productId})
    
    return packs
  }
}