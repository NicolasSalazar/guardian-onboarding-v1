import { User } from '../entities/user.entity';
import { IRepository } from '../../common/interfaces/repository.interface';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository extends IRepository<User> {
  findByUsername(username: string): Promise<User | null>;
}
