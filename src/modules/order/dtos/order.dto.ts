import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsPositive()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsInt()
  @IsPositive()
  total_price: number;
}

  export class UpdateOrderDto {
    product_name?: string;
    quantity?: number;
    total_price?: number;
    status?: string;
  }
  