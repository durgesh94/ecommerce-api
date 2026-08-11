import { Router } from 'express';

import {
  createProductController,
  getProductByIdController,
  getProductsController,
} from './product.controller';

const router = Router();

router.post('/', createProductController);

router.get('/', getProductsController);

router.get('/:id', getProductByIdController);

export default router;
