import apiClient from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/constants';
import { AuthResponse, ApiResponse } from '@/types';
import { RegisterInput, LoginInput } from '@/lib/validations';

export const authService = {
  // Register with email/password
  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.REGISTER, data);
    return response.data;
  },

  // Login with email/password
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.LOGIN, data);
    return response.data;
  },

  // Google OAuth login/signup
  googleAuth: async (idToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.GOOGLE_AUTH, {
      idToken,
    });
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await apiClient.get(API_ENDPOINTS.PROFILE);
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: { name?: string; avatar?: string | null }) => {
    const response = await apiClient.put(API_ENDPOINTS.PROFILE, data);
    return response.data;
  },
};
