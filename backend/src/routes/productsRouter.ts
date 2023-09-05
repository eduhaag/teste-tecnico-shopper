import { Router, Request, Response } from 'express'
import { ProductsController } from '../controllers/ProductsController'
import { ProductsDatabase } from '../database/ProductsDatabase'

export const productsRouter = Router()

productsRouter.post('/update/file', async (req:Request, res: Response)=>{
  const productDatabase = new ProductsDatabase()
  const pControler = new ProductsController(productDatabase)

  const products = await pControler.getProducts(req.body.ids)

  return res.json(products).send()
})