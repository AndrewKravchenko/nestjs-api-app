import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayload } from '@features/user/interfaces/user-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers?.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException();

    try {
      const currentUser: UserPayload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get('JWT_SECRET'),
        },
      );

      request.currentUser = {
        id: currentUser.id,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        isActive: currentUser.isActive,
      };

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
