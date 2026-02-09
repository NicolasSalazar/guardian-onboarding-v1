import { ApiProperty } from '@nestjs/swagger';

export class HealthResponse {
  @ApiProperty({ description: 'Estado del servicio', example: true })
  ok: boolean;

  @ApiProperty({ description: 'Marca de tiempo', example: '2024-01-01T00:00:00.000Z' })
  timestamp: string;
}

export interface IHealthService {
  check(): HealthResponse;
}
