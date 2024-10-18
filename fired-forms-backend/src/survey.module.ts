import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyController } from './controllers/survey.controller'; // Путь к контроллеру SurveyController
import { SurveyService } from './services/SurveyService'; // Путь к сервису SurveyService
import { Survey } from './entities/survey.entity'; // Путь к сущности Survey
import { SurveyQuestion } from './entities/SurveyQuestion.entity'; // Путь к сущности SurveyQuestion
import { Question } from './entities/Question.entity'; // Путь к сущности Question

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, SurveyQuestion, Question]),
  ],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
