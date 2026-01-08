export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  authProvider?: string;
  createdAt?: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string | null;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: PaginationMeta;
}

export interface TaskStats {
  total: number;
  pending: number;
  'in-progress': number;
  completed: number;
}
