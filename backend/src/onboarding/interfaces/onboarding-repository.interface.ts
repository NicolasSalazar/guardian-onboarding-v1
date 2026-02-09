import { Onboarding } from '../entities/onboarding.entity';
import { IRepository } from '../../common/interfaces/repository.interface';

export const ONBOARDING_REPOSITORY = Symbol('ONBOARDING_REPOSITORY');

export interface IOnboardingRepository extends IRepository<Onboarding> {
  findByDocument(document: string): Promise<Onboarding | null>;
}
