import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, Between } from 'typeorm';
import { Report } from '../entities/Report.entity';
import { CreateReportDto } from '../dto/CreateReportUser.dto';
import { ResponseCategory } from '../entities/ResponseCategory.entity';
import { AnswerCategory } from '../entities/AnswerCategory.entity';
import { Survey } from '../entities/Survey.entity';
import { SurveyQuestion } from '../entities/SurveyQuestion.entity';
import { ReportRecommendation } from '../entities/ReportRecomendation.entity'; // Импортируйте сущность
import { Question } from 'src/entities/Question.entity';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name); // Создаем экземпляр логгера

  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
    @InjectRepository(ResponseCategory)
    private responseCategoriesRepository: Repository<ResponseCategory>,
    @InjectRepository(AnswerCategory)
    private answerCategoriesRepository: Repository<AnswerCategory>,
    @InjectRepository(Survey)
    private surveysRepository: Repository<Survey>,
    @InjectRepository(SurveyQuestion)
    private surveyQuestionsRepository: Repository<SurveyQuestion>,
    @InjectRepository(ReportRecommendation) // Добавьте этот репозиторий
    private recommendationRepository: Repository<ReportRecommendation>, 
  ) {}

  async getOrCreateReport(createReportDto: CreateReportDto): Promise<Report> {
    const { date_start, date_end } = createReportDto;

    this.logger.log(`Проверка наличия отчета за период с ${date_start} по ${date_end}`);

    // Проверка наличия отчета
    const existingReport = await this.reportsRepository.findOne({
      where: {
        date_start: new Date(date_start),
        date_end: new Date(date_end),
      },
      relations: ['recommendations', 'recommendations.category'], // Добавьте необходимые связи
    });

    if (existingReport) {
      this.logger.log(`Найден существующий отчет: ${existingReport.id}`);
      return existingReport; // Возвращаем существующий отчет со всеми данными
    }

    // Если отчета нет, создаем новый
    const newReport = this.reportsRepository.create({
      date_start: new Date(date_start),
      date_end: new Date(date_end),
      name: `Отчет с ${date_start} по ${date_end}`,
      description: `Сгенерирован для периода с ${date_start} по ${date_end}`,
    });

    const savedReport = await this.reportsRepository.save(newReport);
    this.logger.log(`Создан новый отчет: ${savedReport.id}`);

    // Заполнение таблицы ResponseCategory и AnswerCategory
    await this.populateCategoriesAndQuestions(savedReport, date_start, date_end);

    // Загружаем и возвращаем полный отчет с рекомендациями и категориями
    const fullReport = await this.reportsRepository.findOne({
      where: { id: savedReport.id },
      relations: ['recommendations', 'recommendations.category'], // Добавьте необходимые связи
    });

    return fullReport; // Возвращаем полный отчет
  }

  private async populateCategoriesAndQuestions(report: Report, date_start: Date, date_end: Date): Promise<void> {
    this.logger.log(`Заполнение категорий и вопросов для отчета ID ${report.id}`);

    const surveys = await this.surveysRepository.find({
        where: {
            completionDate: Between(date_start, date_end), // Используем Date напрямую
        },
        relations: ['surveyQuestions', 'surveyQuestions.answerCategory', 'surveyQuestions.question'],
    });

    this.logger.log(`Найдено анкет: ${surveys.length}`);

    if (surveys.length === 0) {
        this.logger.warn(`Не найдено анкет в указанный период.`);
        return; // Если нет анкет, выходим из функции
    }

    // Получаем все категории ответов
    const responseCategories = await this.responseCategoriesRepository.find();
    const categoryCountMap = new Map<number, { name: string; count: number }>();
    const recommendations: ReportRecommendation[] = []; // Массив для хранения рекомендаций

    // Обрабатываем анкеты и подсчитываем категории
    surveys.forEach((survey) => {
        survey.surveyQuestions.forEach((question) => {
            const answerCategory = question.answerCategory;
            if (answerCategory) {
                const currentData = categoryCountMap.get(answerCategory.id) || { name: answerCategory.name, count: 0 };
                categoryCountMap.set(answerCategory.id, { name: currentData.name, count: currentData.count + 1 });

                // Создаем рекомендацию для каждой категории
                const recommendation = new ReportRecommendation();
                recommendation.question = question.question.name; // Используем вопрос
                recommendation.name = `Рекомендация на основе категории ${answerCategory.name}`; // Текст рекомендации
              //  recommendation.category = answerCategory.name; // Привязка к AnswerCategory
                recommendation.report = report; // Привязка к отчету

                recommendations.push(recommendation); // Добавляем в массив рекомендаций
            }
        });
    });

    // Сохраняем все рекомендации в базе данных
    if (recommendations.length > 0) {
        await this.recommendationRepository.save(recommendations); // Убедитесь, что у вас есть правильный репозиторий
        this.logger.log(`Сохранено ${recommendations.length} рекомендаций.`);
    }

    // Обновление/создание категорий в ResponseCategory
    for (const [categoryId, data] of categoryCountMap) {
        let existingCategory = await this.responseCategoriesRepository.findOne({ where: { id: categoryId } });

        if (!existingCategory) {
            const newCategory = this.responseCategoriesRepository.create({
                value: data.count.toString(),
                answerCategory: data.name, // Обратите внимание, что здесь нужно использовать правильное поле
            });
            await this.responseCategoriesRepository.save(newCategory);
            this.logger.log(`Сохранена новая категория: ID ${categoryId}, значение: ${data.count}`);
        } else {
            existingCategory.value = data.count.toString();
            await this.responseCategoriesRepository.save(existingCategory);
            this.logger.log(`Обновлена категория: ID ${categoryId}, новое значение: ${existingCategory.value}`);
        }
    }
}


}
