import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '.././ormconfig'; // Импортируем конфигурацию из ormconfig.ts
import { UsersModule } from './users.module';
import { User } from '../src/entities/User.entity';
import { UserLevel } from '../src/entities/UserLevel.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User, UserLevel]),
    UsersModule,
  ],
})
export class AppModule {}
