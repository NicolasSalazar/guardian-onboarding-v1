import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../interfaces/product-repository.interface';
import { Product } from '../entities/product.entity';

@Injectable()
export class InMemoryProductRepository implements IProductRepository {
  private readonly products: Product[] = [
    new Product({
      id: '1',
      name: 'Cuenta de Ahorros Digital',
      description: 'Cuenta de ahorros con manejo 100% digital y sin costos de mantenimiento',
      type: 'SAVINGS',
      interestRate: 4.5,
      minAmount: 0,
      maxAmount: 500000000,
      currency: 'COP',
      isActive: true,
      createdAt: new Date('2024-01-01'),
    }),
    new Product({
      id: '2',
      name: 'Cuenta Corriente Premium',
      description: 'Cuenta corriente con beneficios exclusivos para clientes premium',
      type: 'CHECKING',
      interestRate: 0,
      minAmount: 100000,
      maxAmount: 1000000000,
      currency: 'COP',
      isActive: true,
      createdAt: new Date('2024-01-15'),
    }),
    new Product({
      id: '3',
      name: 'CDT Digital',
      description: 'Certificado de depósito a término con las mejores tasas del mercado',
      type: 'CDT',
      interestRate: 11.5,
      minAmount: 1000000,
      maxAmount: 5000000000,
      currency: 'COP',
      isActive: true,
      createdAt: new Date('2024-02-01'),
    }),
    new Product({
      id: '4',
      name: 'Tarjeta de Crédito Básica',
      description: 'Tarjeta de crédito sin cuota de manejo el primer año',
      type: 'CREDIT_CARD',
      interestRate: 28.5,
      minAmount: 0,
      maxAmount: 10000000,
      currency: 'COP',
      isActive: true,
      createdAt: new Date('2024-03-01'),
    }),
    new Product({
      id: '5',
      name: 'Crédito de Libre Inversión',
      description: 'Crédito personal con tasa competitiva y plazos flexibles',
      type: 'LOAN',
      interestRate: 18.9,
      minAmount: 1000000,
      maxAmount: 100000000,
      currency: 'COP',
      isActive: false,
      createdAt: new Date('2024-03-15'),
    }),
  ];

  async findAll(): Promise<Product[]> {
    return this.products.filter((p) => p.isActive);
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.find((p) => p.id === id) || null;
  }

  async create(entity: Partial<Product>): Promise<Product> {
    const product = new Product({
      ...entity,
      id: String(this.products.length + 1),
      createdAt: new Date(),
    });
    this.products.push(product);
    return product;
  }
}
