import { UserService } from '@features/user';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateToken } from '@utils/token.util';
import * as bcrypt from 'bcrypt';

import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { SignUpAuthDTO } from './dto/sign-up-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpAuthDTO: SignUpAuthDTO) {
    const user = await this.userService.create(signUpAuthDTO);

    return generateToken(user, this.jwtService);
  }

  async signIn(signInAuthDTO: SignInAuthDto) {
    const user = await this.userService.findByEmail(signInAuthDTO.email);
    if (!user) throw new BadRequestException('Bad Credentials');

    const isMatch = await bcrypt.compare(signInAuthDTO.password, user.password);
    if (!isMatch) throw new BadRequestException('Bad Credentials');

    return generateToken(user, this.jwtService);
  }
}
