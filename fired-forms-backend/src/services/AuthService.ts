import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './UsersService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin(login);
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const { password_hash, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid login or password');
  }

  async login(user: any) {
    const payload = {
      username: user.login,
      sub: user.id,
      userLevel: user.userLevel.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
