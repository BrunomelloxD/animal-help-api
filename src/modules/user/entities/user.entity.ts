import { Exclude } from 'class-transformer';

export class User {
  id: string;
  name: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
