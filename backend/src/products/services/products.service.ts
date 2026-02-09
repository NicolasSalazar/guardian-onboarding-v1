import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../interfaces/product-repository.interface';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private static readonly CACHE_KEY_ALL = 'products:all';
  private static readonly CACHE_KEY_PREFIX = 'products:';
  private static readonly CACHE_TTL = 60000;

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findAll(): Promise<Product[]> {
    const cached = await this.cacheManager.get<Product[]>(
      ProductsService.CACHE_KEY_ALL,
    );
    if (cached) {
      return cached;
    }

    const products = await this.productRepository.findAll();
    await this.cacheManager.set(
      ProductsService.CACHE_KEY_ALL,
      products,
      ProductsService.CACHE_TTL,
    );
    return products;
  }

  async findById(id: string): Promise<Product> {
    const cacheKey = `${ProductsService.CACHE_KEY_PREFIX}${id}`;
    const cached = await this.cacheManager.get<Product>(cacheKey);
    if (cached) {
      return cached;
    }

    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }

    await this.cacheManager.set(cacheKey, product, ProductsService.CACHE_TTL);
    return product;
  }
}
