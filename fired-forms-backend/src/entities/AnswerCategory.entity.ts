import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SurveyQuestion } from './SurveyQuestion.entity';

@Entity('answer_categories')
export class AnswerCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SurveyQuestion, (surveyQuestion) => surveyQuestion.answerCategory) // Обратная связь с SurveyQuestion
  surveyQuestions: SurveyQuestion[];
}
