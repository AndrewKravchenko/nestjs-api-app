import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from '@features/user/entities';

export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

@Entity()
export class Role {
  @PrimaryColumn()
  name: RoleEnum;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
