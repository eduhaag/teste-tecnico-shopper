import { ChangeEvent, FormEvent, useState } from 'react'
import {Button} from '../../components/Button'

import { HomeContainer } from './styles'

export function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]

    setSelectedFile(file || null)
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if(selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile)

      const url = import.meta.env.VITE_REACT_API_URL + '/products/update/send-file'

      fetch(url, {
        method: 'POST',
        body: formData
      }).then((response) => {
        console.log(response)
      }).catch(error => [
        console.log(error)
      ])

      // try {
      //   const response = await api.post('products/update/send-file', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   })

      //   console.log(response.data)
      // }
      // catch (error) {
      //   console.log(error)

      //   alert('Ocorreu um erro ao validar o arquivo. Tente novamente.')
      // }
    } else {
      alert('Selecione o arquivo .csv para validação.')
    }
  }

  return (
    <HomeContainer>
      <p>Selecione o arquivo para a atualização de preços. </p>
      <span>O arquivo deve ter formato .csv</span>
      
      <form onSubmit={handleFormSubmit}>
       <input type="file" accept='.csv' name='file' onChange={handleFileChange} />
        <div>
          <Button type='submit'>VALIDAR</Button>
          <Button type='button' disabled level='secondary'>ATUALIZAR</Button>
        </div>        
      </form>
    </HomeContainer>
  )
}