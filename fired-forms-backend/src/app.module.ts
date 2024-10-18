import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '.././ormconfig'; // Импортируем конфигурацию из ormconfig.ts
import { UsersModule } from './users.module';
import { User } from '../src/entities/User.entity';
import { UserLevel } from '../src/entities/UserLevel.entity';
import { Question } from './entities/Question.entity';
import { Survey } from './entities/Survey.entity';
import { AnswerCategory } from './entities/AnswerCategory.entity';
import { ReportRecommendation } from './entities/ReportRecomendation.entity';
import { ResponseCategory } from './entities/ResponseCategory.entity';
import { SurveyQuestion } from './entities/SurveyQuestion.entity';
import { Report } from './entities/Report.entity';
import { QuestionsModule } from './question.module';
import { SurveyModule } from './survey.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User, UserLevel, AnswerCategory, Survey, Question, Report, ReportRecommendation, ResponseCategory, SurveyQuestion]),
    UsersModule,
    QuestionsModule,
    SurveyModule
  ],
})
export class AppModule {}
