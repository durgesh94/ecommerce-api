import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/database';
import { CreateProductDto } from './product.dto';
import { Product } from './product.entity';
import { ProductQuery } from './product.schema';

const SORT_COLUMN_MAP = {
  name: 'product.name',
  price: 'product.price',
  stock: 'product.stock',
  createdAt: 'product.createdAt',
} as const;

export class ProductRepository {
  private readonly productRepository: Repository<Product>;

  constructor(productRepository: Repository<Product> = AppDataSource.getRepository(Product)) {
    this.productRepository = productRepository;
  }

  createProduct = async (productData: CreateProductDto) => {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  };

  getProducts = async (query: ProductQuery) => {
    const { page, limit, search, minPrice, maxPrice, sortBy, sortOrder } = query;

    const qb = this.productRepository.createQueryBuilder('product');

    if (search) {
      qb.andWhere('(product.name ILIKE :search OR product.description ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    if (minPrice !== undefined) {
      qb.andWhere('product.price >= :minPrice', {
        minPrice,
      });
    }

    if (maxPrice !== undefined) {
      qb.andWhere('product.price <= :maxPrice', {
        maxPrice,
      });
    }

    const sortColumn = SORT_COLUMN_MAP[sortBy];

    qb.orderBy(sortColumn, sortOrder.toUpperCase() as 'ASC' | 'DESC');

    qb.skip((page - 1) * limit).take(limit);

    const [products, total] = await qb.getManyAndCount();

    return {
      products,
      total,
    };
  };

  getProductById = async (id: string) => {
    return this.productRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });
  };
}
