import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: "full_name matn bo'lishi kerak" })
  @IsNotEmpty({ message: "full_name bo'sh bo'lmasligi kerak" })
  @MinLength(4, { message: "full_name kamida 4 ta belgidan iborat bo'lishi kerak" })
  full_name: string;

  @IsEmail({}, { message: "email noto‘g‘ri formatda" })
  email: string;

  @IsString({ message: "password matn bo'lishi kerak" })
  @IsNotEmpty({ message: "password bo'sh bo'lmasligi kerak" })
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: "full_name matn bo'lishi kerak" })
  @MinLength(4, { message: "full_name kamida 4 ta belgidan iborat bo'lishi kerak" })
  full_name?: string;

  @IsOptional()
  @IsEmail({}, { message: "email noto‘g‘ri formatda" })
  email?: string;

  @IsOptional()
  @IsString({ message: "password matn bo'lishi kerak" })
  password?: string;
}
