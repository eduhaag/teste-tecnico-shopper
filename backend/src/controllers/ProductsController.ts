import { Request, Response } from "express";
import { makeValidateProductUpdateService } from "../factories/makeValidateProductUpdateService";
import fs from "fs";
import { IValidateRequest } from "../Services/ValidateProductUpdateService";


export class ProductsController {

  async getProducts(req: Request, res: Response){
    const { file } = req

    if(!file) {
      return res.status(400).json({
        ok: false,
        message: 'No CSV file uploaded'
      })
    }

    if(file.mimetype !== 'text/csv') {
      return res.status(400).json({
        ok: false,
        message: 'Invalid file format. Expected CSV'
      })
    }
  
    const arrayFromCSV:IValidateRequest[] = []

    await new Promise<void>((resolve, reject) => {
      fs.readFile(file.path, 'utf-8', (err, data) => {
        if(err) {
          reject(err)
        }
 
        const csvData = data.split('\n')
 
        for(let i = 1; i < csvData.length; i++){
          const currentData = csvData[i].split(',')
 
          arrayFromCSV.push({
            productId: parseInt(currentData[0]),
            newPrice: parseFloat(currentData[1])
          })
        }

        resolve()
      })
    })

    const valideUpdateService = makeValidateProductUpdateService()
    const products = await valideUpdateService.validate(arrayFromCSV)

    return res.json(products)
  }

}