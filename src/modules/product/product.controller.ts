import { ProductService } from './product.service';
import { productQuerySchema } from './product.schema';
import { CreateProductDto } from './product.dto';
import { ApiResponse } from '../../common/utils/api-response';
import { asyncHandler } from '../../common/utils/async-handler';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  createProduct = asyncHandler(async (req, res) => {
    const productData: CreateProductDto = req.body;
    const product = await this.productService.createProduct(productData);
    ApiResponse.success(res, product, 'Product created successfully');
  });

  getProducts = asyncHandler(async (req, res) => {
    const query = productQuerySchema.parse(req.query);
    const result = await this.productService.getProducts(query);
    ApiResponse.paginated(res, result.products, result.pagination);
  });

  getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await this.productService.getProductById(id);
    ApiResponse.success(res, product, 'Product retrieved successfully');
  });
}
