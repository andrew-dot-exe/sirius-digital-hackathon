import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SurveyQuestion } from './SurveyQuestion.entity'; // Путь к файлу с сущностью SurveyQuestion
import { ReportRecommendation } from './ReportRecomendation.entity'; // Путь к файлу с сущностью ReportRecommendation

@Entity('response_categories') // Название таблицы
export class ResponseCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SurveyQuestion, (question) => question.responseCategories) // Связь с SurveyQuestion
  surveyQuestion: SurveyQuestion; // Связь с вопросом анкеты

  @Column()
  value: string;

}
