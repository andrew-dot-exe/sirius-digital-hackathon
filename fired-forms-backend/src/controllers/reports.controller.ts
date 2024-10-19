import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ReportsService } from '../services/ReportsService';
import { Report } from '../entities/Report.entity';
import { CreateReportDto } from '../dto/CreateReportUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../jwt/roles.decorator';
import { RolesGuard } from '../jwt/roles.guard'; // Импортируем ваш RolesGuard
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'; // Импортируем декораторы Swagger

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  
  @Post()
  @ApiBearerAuth()
  @Roles('manager') 
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({ status: 201, description: 'Report created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' }) 
  async createReport(@Body() createReportDto: CreateReportDto, @Req() req): Promise<Report> {
    return this.reportsService.getOrCreateReport(createReportDto);
  }
}
