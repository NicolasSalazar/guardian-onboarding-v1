import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private readonly users: Map<string, User> = new Map();

  constructor() {
    const defaultUser = new User({
      id: '1',
      username: 'admin',
      password: 'admin123',
      isActive: true,
      createdAt: new Date('2024-01-01'),
    });
    this.users.set(defaultUser.id, defaultUser);
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    return (
      Array.from(this.users.values()).find(
        (u) => u.username === username,
      ) || null
    );
  }

  async create(entity: Partial<User>): Promise<User> {
    const user = new User({
      ...entity,
      id: String(this.users.size + 1),
      isActive: true,
      createdAt: new Date(),
    });
    this.users.set(user.id, user);
    return user;
  }
}
