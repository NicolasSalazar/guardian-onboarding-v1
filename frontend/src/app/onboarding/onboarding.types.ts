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

export interface OnboardingForm {
  name: string;
  document: string;
  email: string;
  initialAmount: string;
}
