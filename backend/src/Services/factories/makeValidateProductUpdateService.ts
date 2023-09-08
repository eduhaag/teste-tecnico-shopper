import { ProductsRepository } from '../../repositories/ProductsRepositoy'
import { PacksRepository } from '../../repositories/PacksRepository'
import { ValidateProductUpdateService } from '../ValidateProductUpdateService'

export function makeValidateProductUpdateService() {
  const productsRepository = new ProductsRepository()
  const packsRepository = new PacksRepository()
  const service = new ValidateProductUpdateService(productsRepository, packsRepository)
  
  return service
}