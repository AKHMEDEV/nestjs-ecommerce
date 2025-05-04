import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: "name matn bo'lishi kerak" })
  @IsNotEmpty({ message: "name bo'sh bo'lmasligi kerak" })
  name: string;

  @IsString({ message: "description matn bo'lishi kerak" })
  @IsOptional()
  description?: string;

  @IsNumber({}, { message: "price raqam bo'lishi kerak" })
  @IsNotEmpty({ message: "price bo'sh bo'lmasligi kerak" })
  price: number;

  @IsString({ message: "image_url matn bo'lishi kerak" })
  @IsOptional()
  image_url?: string;

  @IsNumber({}, { message: "category_id raqam bo'lishi kerak" })
  @IsOptional()
  category_id?: number;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: "name matn bo'lishi kerak" })
  name?: string;

  @IsOptional()
  @IsString({ message: "description matn bo'lishi kerak" })
  description?: string;

  @IsOptional()
  @IsNumber({}, { message: "price raqam bo'lishi kerak" })
  price?: number;

  @IsOptional()
  @IsString({ message: "image_url matn bo'lishi kerak" })
  image_url?: string;

  @IsOptional()
  @IsNumber({}, { message: "category_id raqam bo'lishi kerak" })
  category_id?: number;
}
