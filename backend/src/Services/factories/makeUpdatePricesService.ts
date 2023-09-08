import { ProductsRepository } from '../../repositories/ProductsRepositoy'
import { PacksRepository } from '../../repositories/PacksRepository'
import { ValidateProductUpdateService } from '../ValidateProductUpdateService'
import { UpdatePricesService } from '../UpdatePricesService'

export function makeUpdatePricesService() {
  const productsRepository = new ProductsRepository()
  const packsRepository = new PacksRepository()
  const validateService = new ValidateProductUpdateService(productsRepository,packsRepository)
  const service = new UpdatePricesService(productsRepository, validateService)
  
  return service
}