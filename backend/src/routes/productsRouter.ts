import { Router} from 'express'
import { ProductsController } from '../controllers/ProductsController'

export const productsRouter = Router()

const productsController = new ProductsController()

productsRouter.post('/update/send-file', productsController.getProducts)