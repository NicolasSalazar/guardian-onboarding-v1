import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OnboardingService } from '../services/onboarding.service';
import { OnboardingResponse } from '../interfaces/onboarding-response.interface';
import { CreateOnboardingDto } from '../dtos/create-onboarding.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createOnboardingDto: CreateOnboardingDto,
  ): Promise<OnboardingResponse> {
    return this.onboardingService.create(createOnboardingDto);
  }
}
