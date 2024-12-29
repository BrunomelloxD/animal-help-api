import { Exclude } from 'class-transformer';

export class OngEntity {
  id: string;
  name: string;
  profile_image: string;
  description: string;
  address: string;
  cep: string;
  @Exclude()
  user_id: string;
  created_at: Date;
  updated_at: Date;

  @Exclude()
  deleted_at: Date;

  constructor(partial: Partial<OngEntity>) {
    Object.assign(this, partial);
  }
}
