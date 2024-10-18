import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Report } from './Report.entity'; // Путь к файлу с сущностью Report
import { ResponseCategory } from './ResponseCategory.entity'; // Путь к файлу с сущностью ResponseCategory

@Entity('report_recommendations') // Название таблицы
export class ReportRecommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Report, (report) => report.recommendations)
  report: Report;

  @ManyToOne(() => ResponseCategory, (category) => category.recommendations)
  category: ResponseCategory; // Связь с ResponseCategory

  @Column()
  name: string;
}
