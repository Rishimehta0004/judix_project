import apiClient from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/constants';
import { Task, ApiResponse, TasksResponse, TaskStats } from '@/types';
import { CreateTaskInput, UpdateTaskInput } from '@/lib/validations';

export interface GetTasksParams {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const taskService = {
  // Create task
  createTask: async (data: CreateTaskInput): Promise<ApiResponse<{ task: Task }>> => {
    const response = await apiClient.post(API_ENDPOINTS.TASKS, data);
    return response.data;
  },

  // Get all tasks with filters
  getTasks: async (params: GetTasksParams = {}): Promise<ApiResponse<TasksResponse>> => {
    const response = await apiClient.get(API_ENDPOINTS.TASKS, { params });
    return response.data;
  },

  // Get single task
  getTaskById: async (id: string): Promise<ApiResponse<{ task: Task }>> => {
    const response = await apiClient.get(`${API_ENDPOINTS.TASKS}/${id}`);
    return response.data;
  },

  // Update task
  updateTask: async (id: string, data: UpdateTaskInput): Promise<ApiResponse<{ task: Task }>> => {
    const response = await apiClient.put(`${API_ENDPOINTS.TASKS}/${id}`, data);
    return response.data;
  },

  // Delete task
  deleteTask: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.delete(`${API_ENDPOINTS.TASKS}/${id}`);
    return response.data;
  },

  // Get task statistics
  getTaskStats: async (): Promise<ApiResponse<{ stats: TaskStats }>> => {
    const response = await apiClient.get(API_ENDPOINTS.TASK_STATS);
    return response.data;
  },
};
