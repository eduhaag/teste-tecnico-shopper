import { Router } from 'express'

export const productsRouter = Router()

productsRouter.post('', (req, res)=>{
  return res.send('ok')
})