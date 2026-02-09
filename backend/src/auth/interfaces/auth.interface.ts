export interface JwtPayload {
  sub: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
}

export interface IAuthService {
  validateUser(username: string, password: string): Promise<JwtPayload | null>;
  login(payload: JwtPayload): LoginResponse;
}
