// order.interface.ts
export interface CreateOrderRequest {
    user_id: number;
    product_name: string;
    quantity: number;
    total_price: number;
  }
  
  export interface UpdateOrderRequest {
    product_name?: string;
    quantity?: number;
    total_price?: number;
    status?: string;
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
  