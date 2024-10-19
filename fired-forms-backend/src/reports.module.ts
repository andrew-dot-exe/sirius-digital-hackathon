import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsService } from './services/ReportsService';
import { ReportsController } from './controllers/reports.controller'; // Импортируем контроллер
import { Report } from './entities/Report.entity'; // Импортируем сущность
import { Survey } from './entities/Survey.entity'; // Импортируем сущность анкеты
import { ResponseCategory } from './entities/ResponseCategory.entity'; // Импортируем сущность категории ответов
import { ReportRecommendation } from './entities/ReportRecomendation.entity'; // Импортируем сущность рекомендаций
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AnswerCategory } from './entities/AnswerCategory.entity';
import { SurveyQuestion } from './entities/SurveyQuestion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, ResponseCategory, AnswerCategory, Survey, SurveyQuestion, ReportRecommendation]), // Добавлены необходимые сущности
    PassportModule,
    JwtModule.register({
      secret: 'hackstreetsecret',
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [ReportsService], 
  controllers: [ReportsController],
})
export class ReportsModule {}
