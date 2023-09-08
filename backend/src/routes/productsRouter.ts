import { Router} from 'express'
import multer from 'multer'

import { ProductsController } from '../controllers/ProductsController'

export const productsRouter = Router()

const upload = multer({storage: multer.diskStorage({
  destination: 'tmp/',
})})

const productsController = new ProductsController()

productsRouter.put('/update', productsController.updateProducts)

productsRouter.post('/update/send-file', 
  upload.single('file'), 
  productsController.checkProducts
)