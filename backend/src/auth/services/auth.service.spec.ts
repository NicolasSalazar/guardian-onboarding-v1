import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { USER_REPOSITORY } from '../interfaces/user-repository.interface';
import { User } from '../entities/user.entity';

const mockUser = new User({
  id: '1',
  username: 'admin',
  password: 'admin123',
  isActive: true,
  createdAt: new Date(),
});

const mockUserRepository = {
  findAll: jest.fn().mockResolvedValue([mockUser]),
  findById: jest.fn().mockResolvedValue(mockUser),
  findByUsername: jest.fn().mockImplementation((username: string) => {
    if (username === mockUser.username) {
      return Promise.resolve(mockUser);
    }
    return Promise.resolve(null);
  }),
  create: jest.fn().mockResolvedValue(mockUser),
};

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-jwt-token'),
          },
        },
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return payload for valid credentials', async () => {
      const result = await service.validateUser('admin', 'admin123');
      expect(result).toEqual({ sub: '1', username: 'admin' });
      expect(mockUserRepository.findByUsername).toHaveBeenCalledWith('admin');
    });

    it('should return null for invalid credentials', async () => {
      const result = await service.validateUser('wrong', 'wrong');
      expect(result).toBeNull();
    });

    it('should return null for inactive user', async () => {
      const inactiveUser = new User({ ...mockUser, isActive: false });
      mockUserRepository.findByUsername.mockResolvedValueOnce(inactiveUser);
      const result = await service.validateUser('admin', 'admin123');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and expiration', () => {
      const payload = { sub: '1', username: 'admin' };
      const result = service.login(payload);
      expect(result).toEqual({
        accessToken: 'mock-jwt-token',
        expiresIn: 300,
      });
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
    });
  });

  describe('authenticateUser', () => {
    it('should return token for valid credentials', async () => {
      const result = await service.authenticateUser('admin', 'admin123');
      expect(result.accessToken).toBe('mock-jwt-token');
      expect(result.expiresIn).toBe(300);
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      await expect(
        service.authenticateUser('wrong', 'wrong'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
