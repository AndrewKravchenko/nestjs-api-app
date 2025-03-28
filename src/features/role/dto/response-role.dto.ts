import { RoleEnum } from '@features/role/entities';
import { Expose } from 'class-transformer';

export class ResponseRoleDTO {
  @Expose()
  name: RoleEnum;

  @Expose()
  description: string;
}
