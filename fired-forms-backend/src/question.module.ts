import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsService } from './services/QuestionService';
import { QuestionsController } from './controllers/question.controller';
import { Question } from './entities/Question.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}