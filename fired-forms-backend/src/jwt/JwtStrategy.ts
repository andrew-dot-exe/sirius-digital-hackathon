import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../services/UsersService'; // Импортируйте ваш сервис пользователей
import { User } from '../entities/User.entity'; // Импортируйте вашу сущность User

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, 
      secretOrKey: 'hackstreetsecret',
    });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException(); 
    }
    return user; 
  }
}

interface JwtPayload {
  sub: number; 
  username: string; 
  userLevel?: string; 
}