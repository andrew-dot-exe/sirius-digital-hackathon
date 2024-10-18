import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User.entity'; // Adjust the path according to your project structure

@Entity('user_levels')
export class UserLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.userLevel)
  users: User[];
}
