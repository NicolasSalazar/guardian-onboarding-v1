import { ApiProperty } from '@nestjs/swagger';

export interface JwtPayload {
  sub: string;
  username: string;
  iat?: number;
  exp?: number;
}

export class LoginResponse {
  @ApiProperty({
    description: 'Token JWT de acceso',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Tiempo de expiracion del token en segundos',
    example: 300,
  })
  expiresIn: number;
}

export interface IAuthService {
  validateUser(username: string, password: string): Promise<JwtPayload | null>;
  login(payload: JwtPayload): LoginResponse;
}
