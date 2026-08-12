import { Request, Response, NextFunction } from 'express';

import { createProduct, getProductById, getProducts } from './product.service';
import { productQuerySchema } from './product.validation';
import { ApiResponse } from '../../common/utils/api-response';

export const createProductController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, stock } = req.body;

    const product = await createProduct(name, description, price, stock);

    ApiResponse.success(res, {
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// export const getProductsController = async (_req: Request, res: Response, next: NextFunction) => {
//   try {
//     const products = await getProducts();

//     res.status(200).json({
//       success: true,
//       data: products,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const getProductsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = productQuerySchema.parse(req.query);

    const result = await getProducts(query);

    ApiResponse.paginated(res, result.products, result.pagination);
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const product = await getProductById(id);

    ApiResponse.success(res, {
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
