import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, 
    updateProduct } from '../controller/product.controller.js';
    
const router = express.Router();

router.post("/" , createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct)
router.put("/:id" , updateProduct)
router.delete("/:id" , deleteProduct)

export default router;