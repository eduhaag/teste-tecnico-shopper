import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { ZodError } from 'zod'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3001

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if(error instanceof ZodError) {
    return res.status(400).json({
      ok: false,
      message: 'Validation error',
      issues: error.format()
    })
  }

  return res.status(500).json({
    ok: false,
    message: 'Server error'
  })
})

const server = app.listen(port, () => {
  if(server){
    console.log(`Servidor iniciado. Porta: ${port}`)
  } else {
    console.log('Falha ao iniciar o servidor.')
  }
})

export default app