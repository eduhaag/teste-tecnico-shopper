import { Router } from "express";
import { productsRouter } from "./productsRouter";

export const router = Router()

router.use('/products', productsRouter)
