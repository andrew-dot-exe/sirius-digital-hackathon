import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { SurveyQuestion } from './SurveyQuestion.entity';
import { User } from './User.entity';

@Entity('surveys')
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.surveys) 
  users: number;

  @CreateDateColumn({ name: 'completion_date' })
  completionDate: Date;

  @OneToMany(() => SurveyQuestion, (surveyQuestion) => surveyQuestion.survey)
  surveyQuestions: SurveyQuestion[];
}
