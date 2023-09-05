import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3001

const server = app.listen(port, () => {
  if(server){
    console.log(`Servidor iniciado. Porta: ${port}`)
  } else {
    console.log('Falha ao iniciar o servidor.')
  }
})

export default app