import { ValidateProductUpdateService } from "../Services/ValidateProductUpdateService";
import { ProductsController } from "../controllers/ProductsController";
import { PackagesDatabase } from "../database/PackagesDatabase";
import { ProductsDatabase } from "../database/ProductsDatabase";

export function makeValidateProductUpdateService() {
  const productsDatabase = new ProductsDatabase()
  const packsDatabase = new PackagesDatabase()
  const service = new ValidateProductUpdateService(productsDatabase, packsDatabase)
  
  return service
}