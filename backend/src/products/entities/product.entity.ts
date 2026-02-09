import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ description: 'ID del producto', example: '1' })
  id: string;

  @ApiProperty({ description: 'Nombre del producto', example: 'Cuenta de Ahorros Digital' })
  name: string;

  @ApiProperty({ description: 'Descripcion del producto', example: 'Cuenta de ahorros con manejo 100% digital' })
  description: string;

  @ApiProperty({ description: 'Tipo de producto', example: 'SAVINGS', enum: ['SAVINGS', 'CHECKING', 'CDT', 'CREDIT_CARD', 'LOAN'] })
  type: string;

  @ApiProperty({ description: 'Tasa de interes', example: 4.5 })
  interestRate: number;

  @ApiProperty({ description: 'Monto minimo', example: 0 })
  minAmount: number;

  @ApiProperty({ description: 'Monto maximo', example: 500000000 })
  maxAmount: number;

  @ApiProperty({ description: 'Moneda', example: 'COP' })
  currency: string;

  @ApiProperty({ description: 'Estado activo del producto', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'Fecha de creacion' })
  createdAt: Date;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
