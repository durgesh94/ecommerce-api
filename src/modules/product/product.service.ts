import { productRepository } from './product.repository';
import { ProductQuery } from './product.dto';

export const createProduct = async (
  name: string,
  description: string | null,
  price: number,
  stock: number,
) => {
  const product = productRepository.create({
    name,
    description,
    price,
    stock,
  });

  return productRepository.save(product);
};

// export const getProducts = async () => {
//   return productRepository.find({
//     where: {
//       isActive: true,
//     },
//     order: {
//       createdAt: 'DESC',
//     },
//   });
// };

export const getProducts = async (query: ProductQuery) => {
  const { page, limit, search, minPrice, maxPrice, sortBy, sortOrder } = query;

  const queryBuilder = productRepository
    .createQueryBuilder('product')
    .where('product.isActive = :isActive', {
      isActive: true,
    });

  if (search) {
    queryBuilder.andWhere(
      `(product.name ILIKE :search
        OR product.description ILIKE :search)`,
      {
        search: `%${search}%`,
      },
    );
  }

  if (minPrice !== undefined) {
    queryBuilder.andWhere('product.price >= :minPrice', {
      minPrice,
    });
  }

  if (maxPrice !== undefined) {
    queryBuilder.andWhere('product.price <= :maxPrice', {
      maxPrice,
    });
  }

  queryBuilder
    .orderBy(`product.${sortBy}`, sortOrder.toUpperCase() as 'ASC' | 'DESC')
    .skip((page - 1) * limit)
    .take(limit);

  const [products, total] = await queryBuilder.getManyAndCount();

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
};

export const getProductById = async (id: number) => {
  return productRepository.findOne({
    where: {
      id,
      isActive: true,
    },
  });
};
