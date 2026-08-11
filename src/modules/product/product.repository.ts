import { AppDataSource } from '../../config/database';
import { Product } from './product.entity';

export const productRepository = AppDataSource.getRepository(Product);
