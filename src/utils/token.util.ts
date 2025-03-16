import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@features/user';
import { UserPayload } from "@features/user/interfaces/user-payload.interface";

export const generateToken = (user: UserEntity, jwtService: JwtService) => {
  const payload: UserPayload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
  };

  return jwtService.signAsync(payload);
};
