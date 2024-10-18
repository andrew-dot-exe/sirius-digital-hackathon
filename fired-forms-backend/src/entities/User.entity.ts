import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserLevel } from './UserLevel.entity'; // Adjust the path according to your project structure

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
}
