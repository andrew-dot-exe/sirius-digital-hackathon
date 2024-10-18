import { Controller, Get } from '@nestjs/common';
import { QuestionsService } from '../services/QuestionService'; 
import { Question } from '../entities/Question.entity'; 

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async getAllQuestions(): Promise<Question[]> {
    return this.questionsService.findAll();
  }
}
