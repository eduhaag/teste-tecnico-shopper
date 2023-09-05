import { Database } from "./Database";

export class PackagesDatabase extends Database {
  private static TABLE = 'packs'

  public async getPacksByIds(idList: number[]){
    const packs = await Database.connection()
      .select('*')
      .from(PackagesDatabase.TABLE)
      .whereIn('pack_id', idList)

    return packs
  }

  public async getPacksByProduct(productId: number) {
    const packs = await Database.connection()
      .select('*').from(PackagesDatabase.TABLE)
      .where({product_id: productId})
    
    return packs
  }
}