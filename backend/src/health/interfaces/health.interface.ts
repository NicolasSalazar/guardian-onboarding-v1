export interface HealthResponse {
  ok: boolean;
  timestamp: string;
}

export interface IHealthService {
  check(): HealthResponse;
}
