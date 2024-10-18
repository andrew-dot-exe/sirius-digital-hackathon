import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { SurveyService } from '../services/SurveyService';
import { CreateSurveyDto } from '../dto/CreateSurvey.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../jwt/roles.decorator';
@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Roles('manager')
  @Post()
  async createSurvey(
    @Req() req, 
    @Body() createSurveyDto: CreateSurveyDto
  ) {
    const userId = req.user.id; 

    return await this.surveyService.createSurvey(userId, createSurveyDto, req.transactionManager);
  }
}
