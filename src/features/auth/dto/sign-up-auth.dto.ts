import { RoleEnum } from '@features/role/entities';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpAuthDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  role: RoleEnum;
}
