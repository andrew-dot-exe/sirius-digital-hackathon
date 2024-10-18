import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Survey } from '../entities/Survey.entity';
import { SurveyQuestion } from '../entities/SurveyQuestion.entity';
import { Question } from '../entities/Question.entity';
import { CreateSurveyDto } from '../dto/CreateSurvey.dto';
import { User } from '../entities/User.entity';
import { executeRequest } from '../yandexai-prompts/logic';
import { AnswerCategory } from 'src/entities/AnswerCategory.entity';
@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
    @InjectRepository(SurveyQuestion) private surveyQuestionRepository: Repository<SurveyQuestion>,
    @InjectRepository(Question) private questionRepository: Repository<Question>,
  ) {}

  async createSurvey(userId: number, createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return await this.surveyRepository.manager.transaction(async transactionalEntityManager => {
      const survey = new Survey();
      survey.user = { id: userId } as User; // Проверьте, что User определен

      const savedSurvey = await transactionalEntityManager.save(survey);

      for (const questionDto of createSurveyDto.surveyQuestions) {
        const surveyQuestion = new SurveyQuestion();
        const question = await this.questionRepository.findOne({ where: { id: questionDto.questionId } });

        if (!question) {
          throw new Error(`Question with id ${questionDto.questionId} not found`);
        }

        surveyQuestion.survey = savedSurvey;
        surveyQuestion.question = question;
        surveyQuestion.answer = questionDto.answer;

        const answerCategory = new AnswerCategory();
        answerCategory.name = await executeRequest(`Необходимо ответить на вопрос, ${surveyQuestion.question}` +
        "Ответ должен быть таким, чтобы его можно было категоризовать, то есть, состоять из минимума слов. Не должно быть никаких уточнений",
        surveyQuestion.answer);

        answerCategory.surveyQuestions.push(surveyQuestion);
        
        await transactionalEntityManager.save(surveyQuestion);
        await transactionalEntityManager.save(answerCategory);
      }

      return savedSurvey;
    });
  }
}
