import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PostgresService } from 'src/database/db';
import { FsHelper } from 'src/helper';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PostgresService, FsHelper],
})
export class CategoryModule {}
