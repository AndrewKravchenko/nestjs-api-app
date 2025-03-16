import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Role } from '@features/role/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
