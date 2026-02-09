import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OnboardingService } from '../services/onboarding.service';
import { OnboardingResponse } from '../interfaces/onboarding-response.interface';
import { CreateOnboardingDto } from '../dtos/create-onboarding.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Onboarding')
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Crear solicitud de onboarding', description: 'Crea una nueva solicitud de onboarding para un cliente. Requiere autenticacion JWT.' })
  @ApiResponse({ status: 201, description: 'Solicitud creada exitosamente', type: OnboardingResponse })
  @ApiResponse({ status: 401, description: 'No autorizado - Token JWT invalido o ausente' })
  @ApiResponse({ status: 409, description: 'Ya existe una solicitud para este documento' })
  async create(
    @Body() createOnboardingDto: CreateOnboardingDto,
  ): Promise<OnboardingResponse> {
    return this.onboardingService.create(createOnboardingDto);
  }
}
