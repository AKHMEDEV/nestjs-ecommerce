import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total_price: number;

  @IsNumber()
  user_id: number;
}

export class UpdateOrderDto {
  product_name?: string;
  quantity?: number;
  total_price?: number;
}
