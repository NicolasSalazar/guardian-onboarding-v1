import { Module } from '@nestjs/common';
import { OnboardingController } from './controllers/onboarding.controller';
import { OnboardingService } from './services/onboarding.service';
import { InMemoryOnboardingRepository } from './repositories/in-memory-onboarding.repository';
import { ONBOARDING_REPOSITORY } from './interfaces/onboarding-repository.interface';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [OnboardingController],
  providers: [
    OnboardingService,
    {
      provide: ONBOARDING_REPOSITORY,
      useClass: InMemoryOnboardingRepository,
    },
  ],
})
export class OnboardingModule {}
