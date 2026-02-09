import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { ONBOARDING_REPOSITORY } from '../interfaces/onboarding-repository.interface';
import { OnboardingStatus } from '../entities/onboarding.entity';

describe('OnboardingService', () => {
  let service: OnboardingService;

  const mockRepository = {
    findByDocument: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockImplementation((data) =>
      Promise.resolve({
        onboardingId: 'test-uuid',
        status: OnboardingStatus.REQUESTED,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ),
    findAll: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OnboardingService,
        { provide: ONBOARDING_REPOSITORY, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<OnboardingService>(OnboardingService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    const validDto = {
      name: 'Juan Pérez',
      document: '1234567890',
      email: 'juan@email.com',
      initialAmount: 500000,
    };

    it('should create a new onboarding with REQUESTED status', async () => {
      const result = await service.create(validDto);
      expect(result).toEqual({
        onboardingId: 'test-uuid',
        status: OnboardingStatus.REQUESTED,
      });
      expect(mockRepository.create).toHaveBeenCalledWith(validDto);
    });

    it('should throw ConflictException if document already exists', async () => {
      mockRepository.findByDocument.mockResolvedValueOnce({
        onboardingId: 'existing',
        document: validDto.document,
      });

      await expect(service.create(validDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
