import { User } from '../fired-forms-backend/src/entities/User.entity';
import { UserLevel } from '../fired-forms-backend/src/entities/UserLevel.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  //Никитиа sa
  //Дима qwerty
  password: 'sa',
  database: 'postgres',
  logging: true,
  synchronize: false,
  migrationsRun: false,
  entities: [User, UserLevel],
  migrations: ['src/migrations/*.ts'],
};

export const AppDataSource = new DataSource(dataSourceOptions);
