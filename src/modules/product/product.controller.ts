import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async getAllProducts() {
        return await this.productService.getAllProducts();
    }

    @Post()
    async createProduct(@Body() body: any) {
        return await this.productService.createProduct(body)
    }

    @Put(":id")
    async updateProduct(@Param() params: any, @Body() body: any) {
        return await this.productService.updateProduct(+params?.id, body)
    }

    @Delete(":id")
    async deleteProduct(@Param() params: any) {
        return await this.productService.deleteProduct(+params?.id)
    }
}