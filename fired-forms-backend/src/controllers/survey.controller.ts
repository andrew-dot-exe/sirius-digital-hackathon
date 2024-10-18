import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { SurveyService } from '../services/SurveyService';
import { CreateSurveyDto } from '../dto/CreateSurvey.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../jwt/roles.decorator';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'; // Импортируем декораторы Swagger

@ApiTags('surveys')
@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles('hr', 'default')
  @ApiResponse({ status: 201, description: 'Survey created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' }) 
  async createSurvey(
    @Req() req, 
    @Body() createSurveyDto: CreateSurveyDto
  ) {
    const userId = req.user.id; 

    return await this.surveyService.createSurvey(userId, createSurveyDto);
  }
}
