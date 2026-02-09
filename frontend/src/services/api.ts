import {
  LoginRequest,
  LoginResponse,
  Product,
  OnboardingRequest,
  OnboardingResponse,
  ApiResponse,
} from '@/types';

const API_BASE = '/api';

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'An unexpected error occurred',
    }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export const authService = {
  login: (data: LoginRequest) =>
    request<ApiResponse<LoginResponse>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const productsService = {
  getAll: () => request<ApiResponse<Product[]>>('/products'),
  getById: (id: string) => request<ApiResponse<Product>>(`/products/${id}`),
};

export const onboardingService = {
  create: (data: OnboardingRequest) =>
    request<ApiResponse<OnboardingResponse>>('/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
