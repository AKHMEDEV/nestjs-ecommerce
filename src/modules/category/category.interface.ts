export interface CreateCategoryRequest {
  name: string;
  category_id?: number;
}

export interface CategoryResponse {
  message: string;
  data: any;
}

export interface UpdateCategoryRequest {
  name: string;
}

export interface GetCategoriesResponse {
  message: string;
  count: number;
  data: any;
}
