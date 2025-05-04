import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString({ message: "product_name matn bo'lishi kerak" })
  @IsNotEmpty({ message: "product_name bo'sh bo'lmasligi kerak" })
  product_name: string;

  @IsNumber({}, { message: "quantity raqam bo'lishi kerak" })
  quantity: number;

  @IsNumber({}, { message: "total_price raqam bo'lishi kerak" })
  total_price: number;

  @IsNumber({}, { message: "user_id raqam bo'lishi kerak" })
  user_id: number;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber({}, { message: "user_id raqam bo'lishi kerak" })
  user_id?: number;

  @IsOptional()
  @IsString({ message: "product_name matn bo'lishi kerak" })
  product_name?: string;

  @IsOptional()
  @IsNumber({}, { message: "quantity raqam bo'lishi kerak" })
  quantity?: number;

  @IsOptional()
  @IsNumber({}, { message: "total_price raqam bo'lishi kerak" })
  total_price?: number;
}
