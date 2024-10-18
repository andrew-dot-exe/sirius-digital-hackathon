
export class CreateSurveyDto {
    surveyQuestions: SurveyQuestionDto[];
  }
  
  export class SurveyQuestionDto {
    questionId: number;
    answer: string; 
  }
  