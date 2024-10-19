import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { ReportRecommendation } from './ReportRecomendation.entity'; // Путь к файлу с сущностью ReportRecommendation
import { AnswerCategory } from './AnswerCategory.entity';
import { SurveyQuestion } from './SurveyQuestion.entity';

@Entity('response_categories')
export class ResponseCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name : "answer_category"})
  answerCategory: string; 

  @Column()
  value: string;

  @OneToMany(() => ReportRecommendation, (recommendation) => recommendation.category)
  @JoinColumn()
  recommendations: ReportRecommendation[];
}
