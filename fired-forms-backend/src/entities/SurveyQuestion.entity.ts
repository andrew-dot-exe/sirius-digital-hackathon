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
@Entity('survey_questions')
export class SurveyQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Survey, (survey) => survey.surveyQuestions)
  survey: Survey;

  @ManyToOne(() => Question, (question) => question.surveyQuestions)
  question: Question;

  @Column()
  answer: string;

  @Column({ name: 'category_id', nullable: true })
  categoryId: number | null;

  @OneToMany(() => ResponseCategory, (category) => category.surveyQuestion)
  responseCategories: ResponseCategory[];
}
