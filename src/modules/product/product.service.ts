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
  
  @Injectable()
  export class ProductService {
    constructor(private readonly pg: PostgresService) {}
  
    async onModuleInit() {
      await this.pg.query(ProductTableModel);
      console.log('product table created ✅');
    }
  
    async getAll(): Promise<GetProductsResponse> {
      const result = await this.pg.query(`
        SELECT 
          p.id AS product_id,
          p.name AS product_name,
          p.description AS product_description,
          p.price,
          p.quantity,
          p.image_url,
          c.name AS category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id;
      `
      );
      return {
        message: 'success',
        count: result.length,
        data: result,
      };
    }
  
    async create(body: CreateProductRequest): Promise<ProductResponse> {
      try {
        const result = await this.pg.query(
          `INSERT INTO products(name, description, price, image_url, category_id)
           VALUES($1, $2, $3, $4, $5) RETURNING *`,
          [body.name, body.description, body.price, body.image_url, body.category_id],
        );
        return { message: 'success', data: result };
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  
    async update(id: number, body: UpdateProductRequest): Promise<ProductResponse> {
      const result = await this.pg.query(
        `UPDATE products SET name = $2, description = $3, price = $4, image_url = $5, category_id = $6
         WHERE id = $1 RETURNING *`,
        [id, body.name, body.description, body.price, body.image_url, body.category_id],
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
        throw new NotFoundException('Product not found or already deleted');
      }
  
      return { message: 'success', data: result };
    }
  }
  