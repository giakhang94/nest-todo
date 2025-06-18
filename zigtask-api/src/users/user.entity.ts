import { Column, PrimaryColumn } from 'typeorm';
type Role = 'admin' | 'user';
export class UserEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;
}
