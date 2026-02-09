import { Injectable, Inject, ConflictException } from '@nestjs/common';
import {
  IOnboardingRepository,
  ONBOARDING_REPOSITORY,
} from '../interfaces/onboarding-repository.interface';
import { OnboardingResponse } from '../interfaces/onboarding-response.interface';
import { CreateOnboardingDto } from '../dtos/create-onboarding.dto';
import { Onboarding } from '../entities/onboarding.entity';

@Injectable()
export class OnboardingService {
  constructor(
    @Inject(ONBOARDING_REPOSITORY)
    private readonly onboardingRepository: IOnboardingRepository,
  ) {}

  async create(dto: CreateOnboardingDto): Promise<OnboardingResponse> {
    const existing = await this.onboardingRepository.findByDocument(
      dto.document,
    );
    if (existing) {
      throw new ConflictException(
        `An onboarding request already exists for document "${dto.document}"`,
      );
    }

    const onboarding = await this.onboardingRepository.create({
      name: dto.name,
      document: dto.document,
      email: dto.email,
      initialAmount: dto.initialAmount,
    });

    return {
      onboardingId: onboarding.onboardingId,
      status: onboarding.status,
    };
  }

  async findAll(): Promise<Onboarding[]> {
    return this.onboardingRepository.findAll();
  }
}
