import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../services/health.service';
import { HealthResponse } from '../interfaces/health.interface';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check(): HealthResponse {
    return this.healthService.check();
  }
}
