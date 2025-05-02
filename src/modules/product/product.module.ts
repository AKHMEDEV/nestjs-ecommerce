import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { PostgresService } from 'src/database/db';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PostgresService],
})
export class ProductModule {}
