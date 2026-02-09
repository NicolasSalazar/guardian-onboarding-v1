export class User {
  id: string;
  username: string;
  password: string;
  isActive: boolean;
  createdAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
