import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';



export class SurveyQuestionDto {
  @ApiProperty() // Описание для ID вопроса
  @IsNotEmpty()
  questionId: number;

  @ApiProperty() // Описание для ответа
  @IsNotEmpty()
  answer: string; 
}
export class CreateSurveyDto {
  @ApiProperty({ type: [SurveyQuestionDto] }) // Описание для массива вопросов
  @IsArray()
  @IsNotEmpty()
  surveyQuestions: SurveyQuestionDto[];
}