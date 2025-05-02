import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostgresService } from 'src/database/db';
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserResponse,
  GetUsersResponse,
} from './user.interface';
import { UserTableModel } from './models/user.model';
import { getAllUsers } from './test';

@Injectable()
export class UserService {
  constructor(private readonly pg: PostgresService) {}

  async onModuleInit() {
    await this.pg.query(UserTableModel);
    console.log('✅ User table created');
  }

  async getAll(): Promise<GetUsersResponse> {
    const usersWithOrders = await this.pg.query(getAllUsers);
    return {
      message: 'success',
      count: usersWithOrders.length,
      data: usersWithOrders,
    };
  }

  async create(body: CreateUserRequest): Promise<UserResponse> {
    try {
      const result = await this.pg.query(
        'INSERT INTO users(full_name, email, password) VALUES($1, $2, $3) RETURNING *',
        [body.full_name, body.email, body.password],
      );
      return { message: 'success', data: result };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('This email is already registered');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, body: UpdateUserRequest): Promise<UserResponse> {
    try {
      const result = await this.pg.query(
        'UPDATE users SET full_name = $2, email = $3, password = $4 WHERE id = $1 RETURNING *',
        [id, body.full_name, body.email, body.password],
      );

      if (!result || result.length === 0) {
        throw new NotFoundException('User not found');
      }

      return { message: 'success', data: result };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('This email is already used by another user');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number): Promise<UserResponse> {
    try {
      const result = await this.pg.query(
        'DELETE FROM users WHERE id = $1 RETURNING *',
        [id],
      );

      if (!result || result.length === 0) {
        throw new NotFoundException('User not found or already deleted');
      }

      return { message: 'success', data: result };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
