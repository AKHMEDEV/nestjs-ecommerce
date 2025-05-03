// 📁 src/category/category.module.ts
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PostgresService } from 'src/database/db';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PostgresService],
})
export class CategoryModule {}
