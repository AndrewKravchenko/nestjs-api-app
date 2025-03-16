import { JwtService } from '@nestjs/jwt';
import { User } from '@features/user/entities';
import { UserPayload } from '@features/user/interfaces/user-payload.interface';

export const generateToken = (user: User, jwtService: JwtService) => {
  const payload: UserPayload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
  };

  return jwtService.signAsync(payload);
};
