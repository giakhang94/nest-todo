import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
type Role = 'admin' | 'user';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;
}
