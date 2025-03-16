import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@features/user';

export const generateToken = (user: UserEntity, jwtService: JwtService) => {
  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    isActive: user.isActive,
  };

  return jwtService.signAsync(payload);
};
