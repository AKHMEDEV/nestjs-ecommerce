export interface CreateOrderRequest {
  product_name: string;
  quantity: number;
  total_price: number;
  user_id: number;
}

export interface UpdateOrderRequest {
  product_name?: string;
  quantity?: number;
  total_price?: number;
}

export interface OrderResponse {
  message: string;
  data: any;
}

export interface GetOrdersResponse {
  message: string;
  count: number;
  data: any[];
}
