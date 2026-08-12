import { AppError } from '../../common/errors/app-error';
import { CreateProductDto } from './product.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductQuery } from './product.schema';

export class ProductService {
  private productRepository: ProductRepository = new ProductRepository();

  async createProduct(productData: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.createProduct(productData);
    return product;
  }

  async getProducts(query: ProductQuery) {
    const { page, limit } = query;
    const { products, total } = await this.productRepository.getProducts(query);

    if (products.length === 0) {
      throw new AppError('No products found', 404);
    }

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    };
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await this.productRepository.getProductById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }
}
