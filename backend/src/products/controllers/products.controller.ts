import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar productos', description: 'Retorna todos los productos financieros activos' })
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [Product] })
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener producto por ID', description: 'Retorna un producto financiero por su ID' })
  @ApiParam({ name: 'id', description: 'ID del producto', example: '1' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Product })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findById(@Param('id') id: string): Promise<Product> {
    return this.productsService.findById(id);
  }
}
