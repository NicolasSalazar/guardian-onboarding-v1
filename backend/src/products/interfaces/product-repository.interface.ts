import { Product } from '../entities/product.entity';
import { IRepository } from '../../common/interfaces/repository.interface';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface IProductRepository extends IRepository<Product> {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
}
