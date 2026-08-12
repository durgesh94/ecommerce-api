import { Router } from 'express';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { validate } from '../../common/middleware/validate.middleware';
import { createProductSchema } from './product.schema';

const productService = new ProductService();
const productController = new ProductController(productService);

const productRouter = Router();

productRouter.post('/', validate(createProductSchema), productController.createProduct);

productRouter.get('/', productController.getProducts);

productRouter.get('/:id', productController.getProductById);

export default productRouter;
