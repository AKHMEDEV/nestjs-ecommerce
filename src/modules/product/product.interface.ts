export interface CreateProductFace{
    name: string;
    count: number;
    price: number;
    category_id: number;
}

export interface UpdateProductFace{
    name: string;
    count: number;
    price: number;
}

export interface GetAllProductsResponse<T = any>{
    message: string;
    count: number;
    data: T;
}

export interface ProductResponse<T = any>{
    message: string;
    data: T;
}