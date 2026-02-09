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
