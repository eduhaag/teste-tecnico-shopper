import { PackagesDatabase } from "../database/PackagesDatabase";
import { ProductsDatabase } from "../database/ProductsDatabase";
import { IProduct } from "../model/Product";

export interface IValidateRequest {
  productId: number
  newPrice: number
}

interface IValidateProducts {
  id: number,
  name?: string,
  cost?: number,
  oldPrice?: number,
  newPrice: number,
  errors: string[]
}

interface ICheckPacksRules {
  packToUpdate: IValidateProducts,
  packItens?: IPackItem[]
}

export class ValidateProductUpdateService {
  private products: IValidateProducts[] = []

  constructor(
    private productsDatabase: ProductsDatabase,
    private packDatabase: PackagesDatabase,
  ){}

  public async validate(products: IValidateRequest[]) {
    const ids = products.map(item => item.productId)
    const response = await this.productsDatabase.listProductsByIds(ids) as IProduct[]

    products.forEach(item => {
      const productInDb = response.find(product => product.code===item.productId)

      let product: IValidateProducts = {
        id: item.productId,
        newPrice: item.newPrice,
        errors: []
      }

      if(productInDb){
        product.name = productInDb.name
        product.cost = productInDb.cost_price
        product.oldPrice = productInDb.sales_price
      }else {
        product.errors?.push('Produto não cadastrado')
      }

      this.products.push(product)
    })

    await this.validateProductsRules()

    return this.products
  }

  private async validateProductsRules(): Promise<any> {
   const products = Promise.all(this.products.map(async product => {

      if(!product.newPrice && typeof(product.newPrice) === 'number'){
        product.errors.push('O valor do campo `new_price` é inválido.')
      }

      /* Se a prop product.name for undefined significa que o produto não está
      cadastrado no banco de dados. */
      if(product.errors.length === 0 && product.name){
        if(product.newPrice < product.cost!){
         product.errors.push('O novo preço está abaixo do custo do produto.')
        }

        if(
          product.newPrice > product.oldPrice! * 1.1 || 
          product.newPrice < product.oldPrice! * 0.9){
          product.errors.push('O reajuste é maior ou menor que 10% do preço atual.')
        }


        const checkProductIsPack = await this.packDatabase.getPackItens(product.id) as IPackItem[]
        if(checkProductIsPack.length > 0) {
          this.checkPacksRules({packToUpdate: product, packItens: checkProductIsPack})
        }else {
          // Verifica se o produto compõe algum pack
          const checkIfItemCoposePacks = await this.packDatabase.getPacksByProduct(product.id)
          if(checkIfItemCoposePacks.length > 0) {
            checkIfItemCoposePacks.forEach(async pack=> {
              const packToUpdate = this.products.find(item => item.id === pack.pack_id)

              if(!packToUpdate){
                product.errors.push(`Para alterar o preço deste produto, o preço do pacote ${pack.pack_id} também deve ser alterado.`)
              } else {
                await this.checkPacksRules({packToUpdate})
              }
            })
          }
        }
      } else {
        product.errors.push('Produto não cadastrado.')
      }
    }))

    return products
  }

  private async checkPacksRules({packToUpdate, packItens}: ICheckPacksRules): Promise<void> {
    const packComponents = packItens || await this.packDatabase.getPackItens(packToUpdate.id)

    const packItensIds = new Set(packComponents.map(item => item.product_id))
    const componentsUpdated = this.products.filter(item => packItensIds.has(item.id))

    /* checa se os components do pack também estão sendo alterados e checa se
    a soma do preço dos componentes é igual ao preço do pack */
    if(packComponents.length === componentsUpdated.length){

      const componentsValues = componentsUpdated.reduce((acc, item) => {
        const componentQty = packComponents.find(component => component.product_id===item.id).qty

        acc.price += item.newPrice * componentQty
        acc.cost += item.cost! * componentQty

        return acc
      }, {price: 0, cost: 0})

      if(packToUpdate.newPrice !== componentsValues.price) {
        packToUpdate.errors.push(
          'Existe uma divergência entre o novo preço e a soma dos preços de seus componentes.')
      }else{
        if(packToUpdate.newPrice < componentsValues.cost){
          packToUpdate.errors.push('O novo preço está abaixo dos custos dos componentes.')
        }
        packToUpdate.cost = componentsValues.cost
      }
            
    } else {
      const pluralMsg = packComponents.length > 1 ? 'os produtos ' : 'o produto'

      packToUpdate.errors?.push(
        `Para alterar o preço é necessário alterar também ${pluralMsg} id: ${packComponents.map(item=>item.product_id).join(', ')}`)
    }    
  }  
}


