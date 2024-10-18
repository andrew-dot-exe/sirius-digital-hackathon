import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Survey } from './Survey.entity';
import { Question } from './Question.entity';
import { ResponseCategory } from './ResponseCategory.entity';
import { AnswerCategory } from './AnswerCategory.entity';
@Entity('survey_questions')
export class SurveyQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Survey, (survey) => survey.surveyQuestions)
  survey: Survey;

  @ManyToOne(() => Question, (question) => question.surveyQuestions)
  question: Question;

  @ManyToOne(() => AnswerCategory, (answerCategory) => answerCategory.surveyQuestions, { nullable: true }) // Связь с AnswerCategory
  answerCategory: AnswerCategory; // Добавляем это поле

  @Column()
  answer: string;

  @OneToMany(() => ResponseCategory, (category) => category.surveyQuestion)
  responseCategories: ResponseCategory[];
}
