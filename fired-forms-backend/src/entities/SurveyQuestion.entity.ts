import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn
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
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @ManyToOne(() => Question, (question) => question.surveyQuestions)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => AnswerCategory, (answerCategory) => answerCategory.surveyQuestions, { nullable: true })
  @JoinColumn({ name: 'answer_category_id' }) // Связь с AnswerCategory
  answerCategory: AnswerCategory; // Добавляем это поле

  @Column()
  answer: string;

}
