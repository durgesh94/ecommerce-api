import { Request, Response, NextFunction } from 'express';

import { createProduct, getProductById, getProducts } from './product.service';

export const createProductController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, stock } = req.body;

    const product = await createProduct(name, description, price, stock);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await getProducts();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const product = await getProductById(id);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
