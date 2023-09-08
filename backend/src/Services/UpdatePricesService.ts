import { ProductsRepository } from "../repositories/ProductsRepositoy";
import { ValidateProductUpdateService } from "./ValidateProductUpdateService";
import { ValidationError } from "./errors/ValidationError";

interface IUpdatePricesRequest {
  products: {
    productId: number,
    newPrice: number
  }[]
}

export class UpdatePricesService {
  constructor(
    private productsRepository: ProductsRepository,
    private validateUpdateService: ValidateProductUpdateService
  ) {}

  async execute({ products }: IUpdatePricesRequest) {
    const checkUpdateRules = await this.validateUpdateService.execute(products)

    const hasAnyProductWithError = checkUpdateRules.some(product => product.errors.length > 0)

    if(hasAnyProductWithError) {
      throw new ValidationError()
    }

    checkUpdateRules.forEach(async product => {
      const {code, newPrice, cost, isPack} = product
  
      if(!isPack) {
        await this.productsRepository.updatePrice({code,sales_price: newPrice})
      } else {
        await this.productsRepository.updatePrice({code, sales_price: newPrice, cost_price: cost})
      }
    })
  }
}