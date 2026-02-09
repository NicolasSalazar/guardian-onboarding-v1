export class Product {
  id: string;
  name: string;
  description: string;
  type: string;
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
