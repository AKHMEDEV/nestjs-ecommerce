// 📁 src/user/interfaces/user.interface.ts
export interface CreateUserRequest {
  full_name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  full_name?: string;
  email?: string;
  password?: string;
}

export interface UserResponse {
  message: string;
  data: any;
}

export interface GetUsersResponse {
  message: string;
  count: number;
  data: any[];
}