import { ChangeEvent, FormEvent, useState } from 'react'
import {Button} from '../../components/Button'

import { HomeContainer } from './styles'
import { api } from '../../libs/axios'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import { Product, ProductsList } from '../../components/ProductsList'



export function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isLoading , setIsLoading] = useState(false)
  const [validatedProducts, setValidatedProducts] = useState<Product[]>([])

  const hasInvalidProduct = validatedProducts.some(item => item.errors.length > 0)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    setSelectedFile(file || null)
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()

    setIsLoading(true)

    if(selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile)

      try {
        const response = await api.post('products/update/send-file', formData)

        setValidatedProducts(response.data)
      }
      catch (error) {
        console.log(error)

        alert('Ocorreu um erro ao validar o arquivo. Tente novamente.')
      }
    } else {
      alert('Selecione o arquivo .csv para validação.')
    }

    setSelectedFile(null)
    setIsLoading(false)
  }

  const handleUpdateProducts = async () => {
    const checkHasSomeError = validatedProducts.some(item => item.errors.length > 0)

    if(checkHasSomeError){
      alert('Exitem produtos com erro de validação.');
    } else {
      setIsLoading(true)

      const products = validatedProducts.map(product => {
        return {
          code: product.code,
          newPrice: product.newPrice
        }
      })

      try {
        await api.put('products/update', {products})

        alert('Preço dos produtos atualizados com sucesso!')

        setValidatedProducts([])
      } catch (error) {
        console.log(error)

        alert('Ocorreu um erro ao atualizar os preços. Tente novamente')
      }

      setIsLoading(false)
    }
  }

  return (
    <HomeContainer>
      <div className="description">
        <p className='description'>Selecione o arquivo para a atualização de preços. </p>
        <span>O arquivo deve ter formato .csv</span>
      </div>
      
      <form onSubmit={handleFormSubmit}>
       <input
        id="file"
        type="file" 
        accept='.csv' 
        name='file' 
        onChange={handleFileChange}
      />
        <div>
          <Button type='submit' disabled={isLoading}>VALIDAR</Button>
          <Button 
            type='button' 
            disabled={validatedProducts.length === 0 || hasInvalidProduct} 
            level='secondary'
            onClick={handleUpdateProducts}
          >
            ATUALIZAR
          </Button>
        </div>
        {
          isLoading &&

          <div className='loading'>
            <LoadingSpinner />
          </div>
        }
      </form>     

      {
        validatedProducts.length > 0 &&
        <ProductsList  products={validatedProducts}/>
      }
      
    </HomeContainer>
    
  )
}