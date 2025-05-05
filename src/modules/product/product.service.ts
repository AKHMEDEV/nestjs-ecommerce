import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PostgresService } from 'src/database/db';
import {
  CreateProductRequest,
  GetProductsResponse,
  ProductResponse,
  UpdateProductRequest,
} from './product.interface';
import { ProductTableModel } from './models/product.model';
import { getAllProducts } from './getAllProductsQuery';

@Injectable()
export class ProductService {
  constructor(private readonly pg: PostgresService) {}

  async onModuleInit() {
    await this.pg.query(ProductTableModel);
    console.log('product table created ✅');
  }

  async getAll(): Promise<GetProductsResponse> {
    const result = await this.pg.query(getAllProducts);
    return {
      message: 'success',
      count: result.length,
      data: result,
    };
  }

  async create(body: CreateProductRequest): Promise<ProductResponse> {
    try {
      console.log('Creating product with data:', body); // Log yaratish

      const result = await this.pg.query(
        `INSERT INTO products(name, description, price, image_url, category_id)
         VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [
          body.name,
          body.description,
          body.price,
          body.image_url,
          body.category_id,
        ],
      );

      console.log('Product created successfully:', result); // L chiqarish

      return { message: 'success', data: result };
    } catch (error) {
      console.error('Error in product creation:', error); // Xatolikni loglash
      throw new InternalServerErrorException(
        'Product creatjhjgffghjion failed',
      );
    }
  }

  async update(
    id: number,
    body: UpdateProductRequest,
  ): Promise<ProductResponse> {
    const result = await this.pg.query(
      `UPDATE products SET name = $2, description = $3, price = $4, image_url = $5, category_id = $6
         WHERE id = $1 RETURNING *`,
      [
        id,
        body.name,
        body.description,
        body.price,
        body.image_url,
        body.category_id,
      ],
    );

    if (!result || result.length === 0) {
      throw new NotFoundException('Product not found');
    }

    return { message: 'success', data: result };
  }

  async delete(id: number): Promise<ProductResponse> {
    const result = await this.pg.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id],
    );

    if (!result || result.length === 0) {
      throw new NotFoundException('product not found');
    }

    return { message: 'success', data: result };
  }
}
