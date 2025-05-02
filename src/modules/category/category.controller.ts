import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, GetAllCategoriesQueryDto } from './dtos';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(@Query() queries: GetAllCategoriesQueryDto) {
    return await this.categoryService.getAllCategories();
  }

  @Post()
  async createCategory(@Body() body: CreateCategoryDto) {
    return await this.categoryService.createCategory(body);
  }

  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.deleteCategory(id);
  }

  @Put(':id')
  async updateCategory(@Param() params: any, @Body() body: any) {
    return await this.categoryService.updateCategory(+params?.id, body);
  }
}
