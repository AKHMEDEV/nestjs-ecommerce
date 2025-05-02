import {Injectable } from '@nestjs/common';
import { PostgresService } from 'src/database/db';
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
  CategoryResponse,
  GetCategoriesResponse,
} from './category.interface';
import { CategoryTableModel } from './models';

@Injectable()
export class CategoryService {
  constructor(private readonly pg: PostgresService) {}

  async onModuleInit() {
    try {
      await this.pg.query(CategoryTableModel);
      console.log('Category table yaratildi✅');
    } catch (error) {
      console.log('Category table yaratishda xatolik ❌');
    }
  }

  async getAllCategories(): Promise<GetCategoriesResponse> {
    const categories = await this.pg.query(
      `SELECT p.id, p.name, json_agg(json_build_object('id', c.id, 'name', c.name)) as subcategories 
            FROM categories p
            LEFT JOIN categories c ON c.category_id = p.id
            GROUP BY p.id, p.name
            HAVING p.category_id IS NULL;`,
    );
    return {
      message: 'success',
      count: categories.length,
      data: categories,
    };
  }

  async createCategory(payload: CreateCategoryRequest,): Promise<CategoryResponse> {
    const category = await this.pg.query(
      'INSERT INTO categories(name, category_id) VALUES ($1, $2) RETURNING *',
      [payload.name, payload.category_id],
    );

    return {
      message: 'success',
      data: category,
    };
  }

  async deleteCategory(id: number): Promise<CategoryResponse> {
    const category = await this.pg.query(
      `DELETE FROM categories WHERE id = $1 RETURNING *;`,
      [id],
    );
    return {
      message: 'success',
      data: category,
    };
  }

  async updateCategory(
    id: number,
    payload: UpdateCategoryRequest,
  ): Promise<CategoryResponse> {
    const category = await this.pg.query(
      'UPDATE categories SET name = $2 WHERE id = $1 RETURNING *;',
      [id, payload.name],
    );
    return {
      message: 'success',
      data: category,
    };
  }
}
