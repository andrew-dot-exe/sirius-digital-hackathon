import { Controller, Get } from '@nestjs/common';
import { QuestionsService } from '../services/QuestionService'; 
import { Question } from '../entities/Question.entity'; 
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('questions') 
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Return all questions.', type: [Question] }) // Описание ответа
  async getAllQuestions(): Promise<Question[]> {
    return this.questionsService.findAll();
  }
}
