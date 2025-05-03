import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PostgresService } from 'src/database/db';
import {
  CreateCategoryRequest,
  GetCategoriesResponse,
  UpdateCategoryRequest,
  CategoryResponse,
} from './category.interface';
import { CategoryTableModel } from './models/category.model';
import { getAllCategories } from './getAllCategoriesQuery';

@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(private readonly pg: PostgresService) {}

  async onModuleInit() {
    await this.pg.query(CategoryTableModel);
    console.log('category table created ✅');
  }

  async getAll(): Promise<GetCategoriesResponse> {
    try {
      const categories = await this.pg.query(getAllCategories);
      return {
        message: 'success',
        count: categories.length,
        data: categories,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(body: CreateCategoryRequest): Promise<CategoryResponse> {
    try {
      const result = await this.pg.query(
        'INSERT INTO categories(name, description, category_id) VALUES($1, $2, $3) RETURNING *',
        [body.name, body.description, body.category_id],
      );
      return { message: 'success', data: result };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('category already exists');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number,body: UpdateCategoryRequest,): Promise<CategoryResponse> {
    try {
      const result = await this.pg.query(
        'UPDATE categories SET name = $2, description = $3, category_id = $4 WHERE id = $1 RETURNING *',
        [id, body.name, body.description, body.category_id],
      );

      if (!result || result.length === 0) {
        throw new NotFoundException('category not found');
      }

      return { message: 'success', data: result };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number): Promise<CategoryResponse> {
    try {
      const result = await this.pg.query(
        'DELETE FROM categories WHERE id = $1 RETURNING *',
        [id],
      );

      if (!result || result.length === 0) {
        throw new NotFoundException('category not found');
      }

      return { message: 'success', data: result };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
