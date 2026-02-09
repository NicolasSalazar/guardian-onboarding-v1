import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PRODUCT_REPOSITORY } from '../interfaces/product-repository.interface';
import { Product } from '../entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProducts: Product[] = [
    new Product({
      id: '1',
      name: 'Cuenta de Ahorros',
      type: 'SAVINGS',
      isActive: true,
    }),
    new Product({
      id: '2',
      name: 'CDT Digital',
      type: 'CDT',
      isActive: true,
    }),
  ];

  const mockRepository = {
    findAll: jest.fn().mockResolvedValue(mockProducts),
    findById: jest.fn().mockImplementation((id: string) => {
      const product = mockProducts.find((p) => p.id === id);
      return Promise.resolve(product || null);
    }),
  };

  const mockCacheManager = {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PRODUCT_REPOSITORY, useValue: mockRepository },
        { provide: CACHE_MANAGER, useValue: mockCacheManager },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all products from repository when cache is empty', async () => {
      const result = await service.findAll();
      expect(result).toEqual(mockProducts);
      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(mockCacheManager.set).toHaveBeenCalled();
    });

    it('should return products from cache when available', async () => {
      mockCacheManager.get.mockResolvedValueOnce(mockProducts);
      const result = await service.findAll();
      expect(result).toEqual(mockProducts);
      expect(mockRepository.findAll).not.toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a product by id', async () => {
      const result = await service.findById('1');
      expect(result).toEqual(mockProducts[0]);
    });

    it('should throw NotFoundException if product not found', async () => {
      await expect(service.findById('999')).rejects.toThrow(NotFoundException);
    });
  });
});
