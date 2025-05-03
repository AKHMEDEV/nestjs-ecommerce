import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostgresService } from 'src/database/db';
import {
  CreateOrderRequest,
  UpdateOrderRequest,
  OrderResponse,
  GetOrdersResponse,
} from './order.interface';
import { OrderTableModel } from './model/order.model';

@Injectable()
export class OrderService {
  constructor(private readonly pg: PostgresService) {}

  async onModuleInit() {
    await this.pg.query(OrderTableModel);
    console.log('order table created ✅');
  }

  async getAll(): Promise<GetOrdersResponse> {
    const result = await this.pg.query('SELECT * FROM orders');
    return {
      message: 'success',
      count: result.length,
      data: result,
    };
  }

  async create(body: CreateOrderRequest): Promise<OrderResponse> {
    try {
      const result = await this.pg.query(
        'INSERT INTO orders(product_name, quantity, total_price, user_id) VALUES($1, $2, $3, $4) RETURNING *',
        [body.product_name, body.quantity, body.total_price, body.user_id],
      );
      return { message: 'success', data: result };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, body: UpdateOrderRequest): Promise<OrderResponse> {
    const result = await this.pg.query(
      'UPDATE orders SET product_name = $2, quantity = $3, total_price = $4 WHERE id = $1 RETURNING *',
      [id, body.product_name, body.quantity, body.total_price],
    );

    if (!result || result.length === 0) {
      throw new NotFoundException('Order not found');
    }

    return { message: 'success', data: result };
  }

  async delete(id: number): Promise<OrderResponse> {
    const result = await this.pg.query(
      'DELETE FROM orders WHERE id = $1 RETURNING *',
      [id],
    );

    if (!result || result.length === 0) {
      throw new NotFoundException('Order not found or already deleted');
    }

    return { message: 'success', data: result };
  }
}
