import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class PostgresService {
  #_pool: Pool;

  constructor() {
    this.#_pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    this.#_pool
      .query('SELECT 1')
      .then(() => console.log('conected to database ✅'))
      .catch((error) => {
        console.error('conecton error to database ❌', error);
        throw new InternalServerErrorException('conecton error to database ❌');
      });
  }

  async query(queryStr: string, params: any[] = []): Promise<any> {
    try {
      const result = await this.#_pool.query(queryStr, params);
      return result.rows;
    } catch (error) {
      console.error('sql query error:', error);
      throw new InternalServerErrorException('queey error');
    }
  }
}
