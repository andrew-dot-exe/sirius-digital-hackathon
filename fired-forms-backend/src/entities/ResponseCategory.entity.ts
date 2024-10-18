import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ReportRecommendation } from './ReportRecomendation.entity'; // Путь к файлу с сущностью ReportRecommendation
import { AnswerCategory } from './AnswerCategory.entity';
import { SurveyQuestion } from './SurveyQuestion.entity';

@Entity('response_categories') // Название таблицы
export class ResponseCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SurveyQuestion, (surveyQuestion) => surveyQuestion.responseCategories) 
  surveyQuestion: SurveyQuestion; // Добавляем это поле

  @Column()
  value: string;

  @OneToMany(() => ReportRecommendation, (recommendation) => recommendation.category)
  recommendations: ReportRecommendation[];
}
