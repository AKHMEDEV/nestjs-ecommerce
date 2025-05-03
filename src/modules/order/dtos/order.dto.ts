import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsOptional()
  @IsString()
  product_name?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  total_price?: number;
}
