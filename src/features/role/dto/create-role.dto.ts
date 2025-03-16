import { IsNotEmpty, Length, IsEnum } from 'class-validator';
import { RoleEnum } from '@features/role/entities';

export class CreateRoleDto {
  @IsEnum(RoleEnum)
  name: RoleEnum;

  @IsNotEmpty()
  @Length(5)
  description: string;
}
