import { Expose } from 'class-transformer';
import { RoleEnum } from '@features/role/entities';

export class ResponseRoleDTO {
  @Expose()
  name: RoleEnum;

  @Expose()
  description: string;
}
