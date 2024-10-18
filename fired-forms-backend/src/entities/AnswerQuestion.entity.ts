import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('answer_categories')
export class AnswerCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
