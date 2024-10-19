import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { ReportRecommendation } from './ReportRecomendation.entity'; // Путь к файлу с сущностью ReportRecommendation

@Entity('reports') // Название таблицы
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date_start: Date;

  @Column({ type: 'date' })
  date_end: Date;

  @Column({ nullable: true })
  name?: string;

  @Column({ type: 'text', nullable: true })
  description?: string; // Изменено на 'description' вместо 'desc'

  @OneToMany(
    () => ReportRecommendation,
    (recommendation) => recommendation.report,
  )
  @JoinColumn()
  recommendations: ReportRecommendation[];
}
