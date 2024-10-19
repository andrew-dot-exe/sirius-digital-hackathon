import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/UsersService';
import { User } from './entities/User.entity';
import { UserLevel } from './entities/UserLevel.entity';
import { UsersController } from './controllers/users.controller';
import { AuthService } from './services/AuthService';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/JwtStrategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserLevel]),
    PassportModule,
    JwtModule.register({
      secret: 'hackstreetsecret',
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy],
  exports: [UsersService, AuthService],
})
export class UsersModule {}
