import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Report } from './Report.entity'; // Путь к файлу с сущностью Report
import { ResponseCategory } from './ResponseCategory.entity'; // Путь к файлу с сущностью ResponseCategory
import { SurveyQuestion } from './SurveyQuestion.entity';

@Entity('report_recommendations') // Название таблицы
export class ReportRecommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Report, (report) => report.recommendations)
  @JoinColumn({ name: 'report_id' })
  report: Report;

  @ManyToOne(() => ResponseCategory, (category) => category.recommendations)
  @JoinColumn({ name: 'category_id' })
  category: ResponseCategory; // Связь с ResponseCategory

  @Column()
  question: string; 

  @Column()
  name: string;
}
