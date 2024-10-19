import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Survey } from '../entities/Survey.entity';
import { SurveyQuestion } from '../entities/SurveyQuestion.entity';
import { Question } from '../entities/Question.entity';
import { CreateSurveyDto } from '../dto/CreateSurvey.dto';
import { User } from '../entities/User.entity';
import { executeRequest } from '../yandexai-prompts/logic';
import { AnswerCategory } from '../entities/AnswerCategory.entity';
import { delay } from 'rxjs';
@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey) private surveyRepository: Repository<Survey>,
    @InjectRepository(SurveyQuestion) private surveyQuestionRepository: Repository<SurveyQuestion>,
    @InjectRepository(Question) private questionRepository: Repository<Question>,
    @InjectRepository(AnswerCategory) private answerCategoryRepository: Repository<AnswerCategory>,
  ) { }

  async createSurvey(userId: number, createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return await this.surveyRepository.manager.transaction(async transactionalEntityManager => {
      const survey = new Survey();
      survey.user = { id: userId } as User;

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
        const answerCategories = await this.answerCategoryRepository.find();
        const categoriesArray = answerCategories.map(category => category.name);
        const categoryName = await executeRequest(`
        Ты — нейросеть для классификации текстов. Твоя задача — проанализировать вопрос и ответ, а затем отнести ответ к одной из категорий.
         Категории могут быть: ${categoriesArray},
        если нужной категории нет, "Прочее".`,
          `Классифицируй следующий текст:
        
        Вопрос: "${surveyQuestion.question}"
        Ответ: "${surveyQuestion.answer}"
        
        Укажи категорию:
        `);

        const finalCategoryName = categoryName.trim().replace(/[.,]/g, '') ?? "Прочее";
        let answerCategory = await this.answerCategoryRepository.findOne({ where: { name: finalCategoryName } });
        if (!answerCategory) {
          answerCategory = await this.answerCategoryRepository.findOne({ where: { name: "Прочее" } });;
        }
          surveyQuestion.answerCategory = answerCategory;
          await transactionalEntityManager.save(surveyQuestion);
        

      }


      return savedSurvey;
    });
  }
}
