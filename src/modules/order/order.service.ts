import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PostgresService } from 'src/database/db';
import {
  CreateOrderRequest,
  UpdateOrderRequest,
  OrderResponse,
  GetOrdersResponse,
} from './order.interface';
import { OrderTableModel } from './model';

@Injectable()
export class OrderService {
  constructor(private readonly pg: PostgresService) {}

  async onModuleInit() {
    await this.pg.query(OrderTableModel);
    console.log('✅ Order table created');
  }

  async getAll(): Promise<GetOrdersResponse> {
    try {
      const orders = await this.pg.query('SELECT * FROM orders');
      return {
        message: 'success',
        count: orders.length,
        data: orders,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(body: CreateOrderRequest): Promise<OrderResponse> {
    try {
      // Foydalanuvchi mavjudligini tekshirish
      const user = await this.pg.query('SELECT * FROM users WHERE id = $1', [
        body.user_id,
      ]);
      if (!user || user.length === 0) {
        throw new BadRequestException('User with given ID does not exist');
      }

      const result = await this.pg.query(
        'INSERT INTO orders(user_id, product_name, quantity, total_price) VALUES($1, $2, $3, $4) RETURNING *',
        [body.user_id, body.product_name, body.quantity, body.total_price],
      );

      return { message: 'Order created', data: result };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, body: UpdateOrderRequest): Promise<OrderResponse> {
    try {
      const result = await this.pg.query(
        'UPDATE orders SET product_name = $2, quantity = $3, total_price = $4, status = $5 WHERE id = $1 RETURNING *',
        [id, body.product_name, body.quantity, body.total_price, body.status],
      );

      if (!result || result.length === 0) {
        throw new NotFoundException('Order not found');
      }

      return { message: 'Order updated', data: result };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number): Promise<OrderResponse> {
    try {
      const result = await this.pg.query(
        'DELETE FROM orders WHERE id = $1 RETURNING *',
        [id],
      );

      if (!result || result.length === 0) {
        throw new NotFoundException('Order not found');
      }

      return { message: 'Order deleted', data: result };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
