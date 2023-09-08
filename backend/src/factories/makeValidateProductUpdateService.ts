import { ValidateProductUpdateService } from "../Services/ValidateProductUpdateService";
import { ProductsController } from "../controllers/ProductsController";
import { PacksRepository } from "../repositories/PacksRepository.ts";
import { ProductsRepository } from "../repositories/ProductsRepositoy";

export function makeValidateProductUpdateService() {
  const productsRepository = new ProductsRepository()
  const packsRepository = new PacksRepository()
  const service = new ValidateProductUpdateService(productsRepository, packsRepository)
  
  return service
}