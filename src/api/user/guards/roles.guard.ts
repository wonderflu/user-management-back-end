import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/api/user/user.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // чтобы получить роли из декоратора нужно заинджекстить класс рефлектор
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()], // 2 элемента, которые мы забираем у контекста, это делается для того...
    ); // чтобы рефлектор понимал какие данные ему необходимо доставать
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request);
    const { user } = request;
    console.log(user);
    // return requiredRoles.some((role) => user.role?.includes(role));
    if (!user.role?.includes(requiredRoles)) throw new UnauthorizedException();
    return true;
  }
}
