import { RoleEnum } from '@features/role/entities';
import { IsNotEmpty, Length, IsEnum } from 'class-validator';

export class CreateRoleDto {
  @IsEnum(RoleEnum)
  name: RoleEnum;

  @IsNotEmpty()
  @Length(5)
  description: string;
}
