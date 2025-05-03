export interface CreateCategoryRequest {
  name: string;
  description?: string;
  category_id?: number;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  category_id?: number;
}

export interface CategoryResponse {
  message: string;
  data: any;
}

export interface GetCategoriesResponse {
  message: string;
  count: number;
  data: any[];
}
