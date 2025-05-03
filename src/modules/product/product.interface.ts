export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category_id?: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  image_url?: string;
  category_id?: number;
}

export interface ProductResponse {
  message: string;
  data: any;
}

export interface GetProductsResponse {
  message: string;
  count: number;
  data: any[];
}
