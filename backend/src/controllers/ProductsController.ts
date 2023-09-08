import { Request, Response } from "express";
import { makeValidateProductUpdateService } from "../factories/makeValidateProductUpdateService";
import fs from "fs";
import { IValidateRequest } from "../Services/ValidateProductUpdateService";
import { convertNumeric } from "../utils/convertNumeric";


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

   try {
    await new Promise<void>((resolve, reject) => {
      fs.readFile(file.path, 'utf-8', (err, data) => {
        if(err) {
          reject(err)
        }
 
        const csvData = data.split('\n') 
        for(let i = 1; i < csvData.length; i++){
          if(csvData[i]!==''){
            const currentData = csvData[i].split(',')
 
            arrayFromCSV.push({
              productId: convertNumeric(currentData[0]),
              newPrice: convertNumeric(currentData[1])
            })
          }
        }

        resolve()
      })
    })

    const validateUpdateService = makeValidateProductUpdateService()

    const checkedProducts = await validateUpdateService.validate(arrayFromCSV)

    const productsToResponse = checkedProducts.map(product => {
      return {
        code: product.code,
        name: product.name,
        oldPrice: product.oldPrice,
        newPrice: product.newPrice,
        errors: product.errors        
      }
    })

    return res.json(productsToResponse)

   } catch(error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Server error'
    })
   }
 
  }

}