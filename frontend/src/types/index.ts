export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  type: string;
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  currency: string;
  isActive: boolean;
}

export interface OnboardingRequest {
  name: string;
  document: string;
  email: string;
  initialAmount: number;
}

export interface OnboardingResponse {
  onboardingId: string;
  status: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}
