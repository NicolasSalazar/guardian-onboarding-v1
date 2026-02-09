export enum OnboardingStatus {
  REQUESTED = 'REQUESTED',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class Onboarding {
  onboardingId: string;
  name: string;
  document: string;
  email: string;
  initialAmount: number;
  status: OnboardingStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Onboarding>) {
    Object.assign(this, partial);
  }
}
