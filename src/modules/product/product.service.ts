import { Injectable } from "@nestjs/common";
import { PostgresService } from "src/database/db";
import { ProductTableModel } from "./models";
import { CreateProductFace, GetAllProductsResponse, ProductResponse, UpdateProductFace } from "./product.interface";

@Injectable()
export class ProductService {
    constructor(private readonly pg: PostgresService) {}

    async onModuleInit() {
        try {
            await this.pg.query(ProductTableModel);
            console.log('Product table yaratildi✅');
            
        } catch (error) {
            console.log('Product table yaratishda xatolik🚫');
        }
    }

    async getAllProducts(): Promise<GetAllProductsResponse> {
        const products = await this.pg.query(
            `SELECT * FROM products;`
        );
        return {
            message: "succes",
            count: products.length,
            data: products,
        }
    }

    async createProduct(payload: CreateProductFace): Promise<ProductResponse> {
        const product = await this.pg.query(
            `INSERT INTO products(name, count, price, category_id) VALUES ($1, $2, $3, $4) RETURNING *`,
            [payload.name, payload.count, payload.price, payload.category_id]
        );

        return {
            message: "succes",
            data: product
        }
    }

    async updateProduct( id: number, payload: UpdateProductFace,): Promise<ProductResponse> {
        console.log(id);
        console.log(payload.name, payload.count, payload.price);
        
        const product = await this.pg.query(
            `UPDATE products
            SET name = COALESCE($1, name), count = COALESCE($2, count), price =COALESCE($3, price)
            WHERE id = $4 RETURNING *`,
            [payload.name, payload.count, payload.price, id]
        );
        return {
            message: "sucess",
            data: product,
        }
    }

    async deleteProduct( id: number): Promise<ProductResponse> {
        const product = await this.pg.query(
            `DELETE FROM products WHERE id = $1`,
            [id],
        );
        return {
            message: "success",
            data: product,
        }
    }
}