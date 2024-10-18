import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { UserLevel } from './UserLevel.entity'; // Adjust the path according to your project structure
import { Survey } from './Survey.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fio: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password_hash: string;

  @ManyToOne(() => UserLevel, (userLevel) => userLevel.users, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_level_id' })
  userLevel: UserLevel;

  @OneToMany(() => Survey, (survey) => survey.user) 
  surveys: Survey[];
}
