import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyController } from './controllers/survey.controller'; // Путь к контроллеру SurveyController
import { SurveyService } from './services/SurveyService'; // Путь к сервису SurveyService
import { Survey } from './entities/Survey.entity'; // Путь к сущности Survey
import { SurveyQuestion } from './entities/SurveyQuestion.entity'; // Путь к сущности SurveyQuestion
import { Question } from './entities/Question.entity'; // Путь к сущности Question
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/JwtStrategy';
import { AnswerCategory } from './entities/AnswerCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, SurveyQuestion, Question, AnswerCategory]),
    PassportModule,
    JwtModule.register({
      secret: 'hackstreetsecret',
      signOptions: { expiresIn: '30m' },
    })
  ],
  controllers: [SurveyController], 
  providers: [SurveyService], 
  exports: [SurveyService],
})
export class SurveyModule {}
