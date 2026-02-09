import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { InMemoryProductRepository } from './repositories/in-memory-product.repository';
import { PRODUCT_REPOSITORY } from './interfaces/product-repository.interface';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: InMemoryProductRepository,
    },
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
