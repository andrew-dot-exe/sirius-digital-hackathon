import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SurveyQuestion } from './SurveyQuestion.entity'; // Путь к файлу SurveyQuestion.entity

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SurveyQuestion, (surveyQuestion) => surveyQuestion.question)
  surveyQuestions: SurveyQuestion[];
}
