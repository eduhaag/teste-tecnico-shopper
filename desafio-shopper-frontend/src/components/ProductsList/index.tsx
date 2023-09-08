import { currencyFormat } from "../../utils/currencyFormat";
import { ListContainer } from "./styles";

export interface Product {
  code: number,
  name: string,
  oldPrice: number,
  newPrice: number,
  errors: string[]
}

interface ProductListProps{
  products: Product[]
}

export function ProductsList({products}: ProductListProps){
  return (
    <ListContainer>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Produto</th>
            <th>Preço atual</th>
            <th>Novo Preço</th>
            <th>Validação</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product => {

              return (
                <tr key={product.code}>
                  <td align="right">{product.code}</td>
                  <td>{product.name}</td>
                  <td align="right">{currencyFormat(product.oldPrice)}</td>
                  <td align="right">{currencyFormat(product.newPrice)}</td>
                  {
                    product.errors.length > 0 ? 
                    (
                      <td className="has-error" width='30%'>
                        <ul>
                          {
                            product.errors.map(error => (
                              <li key={error}>{error}</li>
                            ))
                          }
                        </ul>                       
                      </td>
                    ) : (
                      <td>
                        <p>ok</p>
                      </td>
                    )

                  }
                  
                </tr>
              )
            })
          }
        </tbody>
        
      </table>
    </ListContainer>
  )
}