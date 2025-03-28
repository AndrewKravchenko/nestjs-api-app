import type { User } from '@features/user/entities';
import type { UserPayload } from '@features/user/interfaces/user-payload.interface';
import type { JwtService } from '@nestjs/jwt';

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
