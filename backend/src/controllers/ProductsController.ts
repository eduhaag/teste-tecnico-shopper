import { Request, Response } from 'express'
import fs from 'fs'
import { ZodError, z } from 'zod'

import { IValidateRequest } from '../Services/ValidateProductUpdateService'
import { makeUpdatePricesService } from '../Services/factories/makeUpdatePricesService'
import { makeValidateProductUpdateService } from '../Services/factories/makeValidateProductUpdateService'
import { convertNumeric } from '../utils/convertNumeric'
import { ValidationError } from '../Services/errors/ValidationError'

export class ProductsController {
  async checkProducts(req: Request, res: Response) {
    const { file } = req

    if (!file) {
      return res.status(400).json({
        ok: false,
        message: 'No CSV file uploaded',
      })
    }

    if (file.mimetype !== 'text/csv') {
      return res.status(400).json({
        ok: false,
        message: 'Invalid file format. Expected CSV',
      })
    }

    const arrayFromCSV: IValidateRequest[] = []

    try {
      await new Promise<void>((resolve, reject) => {
        fs.readFile(file.path, 'utf-8', (err, data) => {
          if (err) {
            reject(err)
          }

          const csvData = data.split('\n')
          for (let i = 1; i < csvData.length; i++) {
            if (csvData[i] !== '') {
              const currentData = csvData[i].split(',')

              arrayFromCSV.push({
                productId: convertNumeric(currentData[0]),
                newPrice: convertNumeric(currentData[1]),
              })
            }
          }

          resolve()
        })
      })

      fs.unlink(file.path, (error) => {
        if (error) {
          console.log(`Falha ao excluir o arquivo ${file.filename} de /tmp.`)
        }
      })

      const validateUpdateService = makeValidateProductUpdateService()

      const checkedProducts = await validateUpdateService.execute(arrayFromCSV)

      const productsToResponse = checkedProducts.map((product) => {
        return {
          code: product.code,
          name: product.name,
          oldPrice: product.oldPrice,
          newPrice: product.newPrice,
          errors: product.errors,
        }
      })

      return res.json(productsToResponse)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        ok: false,
        message: 'Internal server error.'
      })
    }
  }

  async updateProducts(req: Request, res: Response) {
    const dataSchema = z.object({
      products: z.array(
        z.object({
          code: z.number(),
          newPrice: z.number(),
        })
      ),
    })

    try {
      const { products } = dataSchema.parse(req.body)

      const productsToUpdate = products.map((product) => {
        return {
          productId: product.code,
          newPrice: product.newPrice,
        }
      })

      const updateService = makeUpdatePricesService()

      await updateService.execute({ products: productsToUpdate })

      return res.status(204).send()
    } catch (error) {

      if(error instanceof ZodError) {
        return res.status(400).json({
          ok: false,
          message: 'Validation error',
          issues: error.format()
        })
      }
      
      if (error instanceof ValidationError) {
        return res.status(400).json({
          ok: false,
          message: error.message,
        })
      }

      console.error(error)
      return res.status(500).json({
        ok: false,
        message: 'Internal server error.'
      })
    }
  }
}
