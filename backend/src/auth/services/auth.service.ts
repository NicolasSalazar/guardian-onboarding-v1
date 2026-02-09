import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService, JwtPayload, LoginResponse } from '../interfaces/auth.interface';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../interfaces/user-repository.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<JwtPayload | null> {
    const user = await this.userRepository.findByUsername(username);
    if (user && user.isActive && user.password === password) {
      return { sub: user.id, username: user.username };
    }
    return null;
  }

  login(payload: JwtPayload): LoginResponse {
    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: 300,
    };
  }

  async authenticateUser(
    username: string,
    password: string,
  ): Promise<LoginResponse> {
    const payload = await this.validateUser(username, password);
    if (!payload) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.login(payload);
  }
}
