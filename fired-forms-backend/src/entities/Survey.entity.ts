import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SurveyQuestion } from './SurveyQuestion.entity'; // Путь к файлу SurveyQuestion.entity

@Entity('surveys')
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'completion_date' })
  completionDate: Date;

  @OneToMany(() => SurveyQuestion, (surveyQuestion) => surveyQuestion.survey)
  surveyQuestions: SurveyQuestion[];
}
