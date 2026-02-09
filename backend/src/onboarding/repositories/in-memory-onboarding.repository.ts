import { Injectable } from '@nestjs/common';
import { IOnboardingRepository } from '../interfaces/onboarding-repository.interface';
import { Onboarding, OnboardingStatus } from '../entities/onboarding.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InMemoryOnboardingRepository implements IOnboardingRepository {
  private readonly onboardings: Map<string, Onboarding> = new Map();

  async findAll(): Promise<Onboarding[]> {
    return Array.from(this.onboardings.values());
  }

  async findById(id: string): Promise<Onboarding | null> {
    return this.onboardings.get(id) || null;
  }

  async findByDocument(document: string): Promise<Onboarding | null> {
    return (
      Array.from(this.onboardings.values()).find(
        (o) => o.document === document,
      ) || null
    );
  }

  async create(entity: Partial<Onboarding>): Promise<Onboarding> {
    const now = new Date();
    const onboarding = new Onboarding({
      ...entity,
      onboardingId: uuidv4(),
      status: OnboardingStatus.REQUESTED,
      createdAt: now,
      updatedAt: now,
    });
    this.onboardings.set(onboarding.onboardingId, onboarding);
    return onboarding;
  }
}
