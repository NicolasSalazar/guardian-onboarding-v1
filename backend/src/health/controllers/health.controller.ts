import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from '../services/health.service';
import { HealthResponse } from '../interfaces/health.interface';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Health check', description: 'Verifica el estado del servicio' })
  @ApiResponse({ status: 200, description: 'Servicio activo', type: HealthResponse })
  check(): HealthResponse {
    return this.healthService.check();
  }
}
