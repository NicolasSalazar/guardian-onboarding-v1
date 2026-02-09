import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { LoginResponse } from '../interfaces/auth.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesion', description: 'Autentica al usuario y retorna un token JWT' })
  @ApiResponse({ status: 200, description: 'Login exitoso', type: LoginResponse })
  @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.authenticateUser(
      loginDto.username,
      loginDto.password,
    );
  }
}
