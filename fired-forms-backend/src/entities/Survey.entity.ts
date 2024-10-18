import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { SurveyQuestion } from './SurveyQuestion.entity';
import { User } from './User.entity';

@Entity('surveys')
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.surveys) 
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'completion_date' })
  completionDate: Date;

  @OneToMany(() => SurveyQuestion, (surveyQuestion) => surveyQuestion.survey)
  surveyQuestions: SurveyQuestion[];
}
