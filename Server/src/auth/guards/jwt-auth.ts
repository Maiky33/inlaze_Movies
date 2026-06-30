import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['token']; // Extraer el token de las cookies

    if (token) {
      const user = await this.usersService.validateUser(token);
      
      if (!user) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      request.user = user; // Agregar el usuario al request
      return true;
    }

    return false;
  }
}