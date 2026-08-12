import { Request, Response, NextFunction } from 'express';

export const asyncHandler =
  <P = any>(fn: (req: Request<P>, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request<P>, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
