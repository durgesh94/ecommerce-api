import { productRepository } from './product.repository';

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

export const getProducts = async () => {
  return productRepository.find({
    where: {
      isActive: true,
    },
    order: {
      createdAt: 'DESC',
    },
  });
};

export const getProductById = async (id: number) => {
  return productRepository.findOne({
    where: {
      id,
      isActive: true,
    },
  });
};
