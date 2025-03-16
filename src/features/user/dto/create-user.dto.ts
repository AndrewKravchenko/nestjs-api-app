import { IsNotEmpty, IsString } from 'class-validator';
import { RoleEnum } from '@features/role/entities';

export class CreateUserDto {
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
