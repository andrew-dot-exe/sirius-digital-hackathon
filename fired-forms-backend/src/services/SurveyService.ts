import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Survey } from '../entities//survey.entity';
import { SurveyQuestion } from '../entities/SurveyQuestion.entity';
import { Question } from '../entities/Question.entity';  // Импорт сущности Question
import { CreateSurveyDto } from '../dto/CreateSurvey.dto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
    @InjectRepository(SurveyQuestion) private surveyQuestionRepository: Repository<SurveyQuestion>,
    @InjectRepository(Question) private questionRepository: Repository<Question>, // Репозиторий для поиска вопроса
  ) {}

  async createSurvey(
    userId: number, 
    createSurveyDto: CreateSurveyDto, 
    entityManager: EntityManager
  ): Promise<Survey> {
    return await entityManager.transaction(async transactionalEntityManager => {
      // Создаем новую анкету
      const survey = new Survey();
      survey.userId = userId;
      
      // Сохраняем анкету
      const savedSurvey = await transactionalEntityManager.save(survey);

      // Добавляем ответы на вопросы
      for (const questionDto of createSurveyDto.surveyQuestions) {
        const surveyQuestion = new SurveyQuestion();

        // Получаем объект Question по questionId
        const question = await this.questionRepository.findOne({
          where: { id: questionDto.questionId }
        });

        if (!question) {
          throw new Error(`Question with id ${questionDto.questionId} not found`);
        }

        surveyQuestion.survey = savedSurvey; // Связываем с анкетой
        surveyQuestion.question = question;  // Связываем с вопросом
        surveyQuestion.answer = questionDto.answer;
        
        await transactionalEntityManager.save(surveyQuestion);
      }

      return savedSurvey;
    });
  }
}
