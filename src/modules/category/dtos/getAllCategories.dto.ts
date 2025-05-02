import {
  IsEnum,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

enum SortFields {
  name = 'name',
}
export class GetAllCategoriesQueryDto {
  // @IsOptional()
  // @IsNumberString()
  // limit: number;

  // @IsNumberString()
  // page: number;

  // @IsString()
  // @IsEnum(SortFields)
  //  sortField: string;

  // @IsOptional()
  // @IsIn(['asc', 'desc'])
  // sortOrder: 'asc' | 'desc';
}
