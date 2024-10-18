import { AnswerCategory } from './src/entities/AnswerCategory.entity';
import { User } from '../fired-forms-backend/src/entities/User.entity';
import { UserLevel } from '../fired-forms-backend/src/entities/UserLevel.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Survey } from './src/entities/Survey.entity';
import { Question } from './src/entities/Question.entity';
import { ReportRecommendation } from './src/entities/ReportRecomendation.entity';
import { ResponseCategory } from './src/entities/ResponseCategory.entity';
import { SurveyQuestion } from './src/entities/SurveyQuestion.entity';
import { Report } from './src/entities/Report.entity';

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
entities: [User, UserLevel, AnswerCategory, Survey, Question, Report, ReportRecommendation, ResponseCategory, SurveyQuestion],
  migrations: ['src/migrations/*.ts'],
};

export const AppDataSource = new DataSource(dataSourceOptions);
