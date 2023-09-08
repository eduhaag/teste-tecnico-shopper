import { ProductsRepository } from '../repositories/ProductsRepositoy'
import { PacksRepository } from '../repositories/PacksRepository'

export interface IValidateRequest {
  productId: number
  newPrice: number
}

interface ICheckedProduct {
  code: number,
  name?: string,
  cost?: number,
  oldPrice?: number,
  newPrice: number,
  isRegistred?: boolean //Produto encontrado no banco de dados?
  isPack?: boolean, 
  errors: string[]
}

export class ValidateProductUpdateService {

  constructor(
    private productsRepository: ProductsRepository,
    private packsRepository: PacksRepository,
  ){}

  public async execute(productsToValidate: IValidateRequest[]): Promise<ICheckedProduct[]>{
    const ids = productsToValidate
      .filter(item => typeof(item.productId)==='number' )
      .map(item => item.productId)
    const products = await this.productsRepository.listProductsByIds(ids) 

    const checkedProducts = Promise.all(
      productsToValidate.map(async productToValidate => {
        const product = products.find(item => item.code() === productToValidate.productId)

        const productToCheck: ICheckedProduct = {
          code: productToValidate.productId,
          newPrice: productToValidate.newPrice,
          errors: []
        }

        if(product) {
          productToCheck.name = product.name()
          productToCheck.cost = product.cost()
          productToCheck.oldPrice = product.price()
          productToCheck.isRegistred = true
        } else {
          productToCheck.errors.push('Produto não cadastrado')
        }

        // checa as regras
        this.checkFormatNewPrice(productToCheck)
        this.checkPriceGreaterThanCost(productToCheck)
        this.checkAdjustmentInLimit(productToCheck)


        // validações relacionadas a packs
        if(productToCheck.isRegistred){
              
          await this.checkProductComposePack(productsToValidate, productToCheck)

          await this.checkPackRules(productsToValidate, productToCheck)


        }       

        return productToCheck
      })
    )

    return checkedProducts
  }

  private checkFormatNewPrice(product: ICheckedProduct) {
    if(!product.newPrice && typeof(product.newPrice)!=='number'){
      product.errors.push('Novo preço ausente ou formato inválido.')
    }
  }

  private checkPriceGreaterThanCost(product: ICheckedProduct) {
    if(product.cost && product.newPrice < product.cost){
      product.errors.push('Novo preço abaixo do preço de custo.')
    }
  }

  private checkAdjustmentInLimit(product: ICheckedProduct) {
    const INCREMENT_ADJUSTMENT_LIMIT = 1.1 // incremento maximo de +10%
    const DECREMENT_ADJUSTMENT_LIMIT = 0.9 // incremento maximo de -10%

    if(product.oldPrice && 
      product.newPrice > product.oldPrice * INCREMENT_ADJUSTMENT_LIMIT) {
      product.errors.push('O aumento é superior a 10% do preço atual.')
    }

    if(product.oldPrice && 
       product.newPrice < product.oldPrice * DECREMENT_ADJUSTMENT_LIMIT) {
      product.errors.push('A redução no preço é superior a 10% do preço atual.')
    }

  }

  private async checkProductComposePack (productsToValidate: IValidateRequest[], product: ICheckedProduct) {
    const packsWithThisProduct = await this.packsRepository.getPacksByProductId(product.code)

    packsWithThisProduct.forEach(pack => {
      if(!productsToValidate.some(item => item.productId === pack.packId())){
        product.errors.push(`Para atualizar este produto o pack ${pack.packId()} também deve ser atualizado.`)
      }
    })
  }

  private async checkPackRules(produtsToValidate: IValidateRequest[], product: ICheckedProduct) {

    
    const pack = await this.packsRepository.getPackById(product.code)
    
    if(pack) {
      product.isPack = true

      const composeItensWithOutUpdate: number[] = []
      const componentsValues = {
        cost: 0,
        price: 0
      }

      /* Verifica se componentes do pack também estão sendo alterado e
      se o preço do pack é igual a soma do preço dos componentes */
      pack.packProducts().forEach(item => {
        const packProduct = produtsToValidate.find(productToCheck => 
          productToCheck.productId === item.product.code()
        )

        if(!packProduct) {
          composeItensWithOutUpdate.push(item.product.code())
        } else {
          componentsValues.price += packProduct.newPrice * item.qty,
          componentsValues.cost += item.product.cost() * item.qty
        }
      })

      if(composeItensWithOutUpdate.length === 0) {
        if(product.newPrice < componentsValues.cost) {
          product.errors.push('Novo preço abaixo do preço de custo.')
        }

        if(product.newPrice !== componentsValues.price) {
          product.errors.push('O novo preço é diferente da soma do preço dos componentes do pack.')
        }

        product.cost = componentsValues.cost
      } else {
        const msg = composeItensWithOutUpdate.length === 1 ? 'o produto' : 'os produtos'

        product.errors.push(
          `Para atualizar este pacote é necessário também atualizar ${msg} ${composeItensWithOutUpdate.join(', ')}`)
      }
    }
  } 

}


