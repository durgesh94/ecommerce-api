import { Router } from 'express';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

const productService = new ProductService();
const productController = new ProductController(productService);

const productRouter = Router();

productRouter.post('/', productController.createProduct);

productRouter.get('/', productController.getProducts);

productRouter.get('/:id', productController.getProductById);

export default productRouter;
