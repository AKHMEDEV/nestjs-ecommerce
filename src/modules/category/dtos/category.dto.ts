import { IsNotEmpty, IsOptional, IsString, IsInt, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: "name matn bo'lishi kerak" })
  @MinLength(4, { message: "name kamida 4 ta belgidan iborat bo'lishi kerak" })
  @IsNotEmpty({ message: "name bo'sh bo'lmasligi kerak" })
  name: string;

  @IsString({ message: "description matn bo'lishi kerak" })
  @IsOptional()
  description?: string;

  @IsOptional()
  category_id?: number;
}

export class UpdateCategoryDto {
  @IsString({ message: "name matn bo'lishi kerak" })
  @MinLength(4, { message: "name kamida 4 ta belgidan iborat bo'lishi kerak" })
  @IsOptional()
  name?: string;

  @IsString({ message: "description matn bo'lishi kerak" })
  @IsOptional()
  description?: string;

  @IsInt({ message: "category_id butun son bo'lishi kerak" })
  @IsOptional()
  category_id?: number;
}
