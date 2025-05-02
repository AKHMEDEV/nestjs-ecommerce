import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Pool } from 'pg';
import { QueryResult } from "typeorm";

@Injectable()
export class PostgresService {
    #_pool: Pool;
    constructor() {
        this.#_pool = new Pool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT) || 5432,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }

    async query(queryStr: string, params: any[] = []): Promise<any> {
        try {
            const result = await this.#_pool.query(queryStr, params);
            return result.rows;
        } catch (error) {
            throw new InternalServerErrorException(
                "Database'ga ulanishda xatolik"
            )
        }
    }
}