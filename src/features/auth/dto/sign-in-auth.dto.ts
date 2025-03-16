import { PickType } from '@nestjs/mapped-types';
import { SignUpAuthDTO } from './sign-up-auth.dto';

export class SignInAuthDto extends PickType(SignUpAuthDTO, [
  'email',
  'password',
]) {}
