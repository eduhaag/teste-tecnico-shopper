import { Request, Response } from "express";
import { makeValidateProductUpdateService } from "../factories/makeValidateProductUpdateService";


export class ProductsController {

  async getProducts(req: Request, res: Response){
    const valideUpdateService = makeValidateProductUpdateService()

    const products = await valideUpdateService.validate(req.body)

    return res.json(products)
  }
}