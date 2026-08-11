import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app-error';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
};
