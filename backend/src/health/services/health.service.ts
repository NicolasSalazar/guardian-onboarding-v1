import { Injectable } from '@nestjs/common';
import { IHealthService, HealthResponse } from '../interfaces/health.interface';

@Injectable()
export class HealthService implements IHealthService {
  check(): HealthResponse {
    return {
      ok: true,
      timestamp: new Date().toISOString(),
    };
  }
}
