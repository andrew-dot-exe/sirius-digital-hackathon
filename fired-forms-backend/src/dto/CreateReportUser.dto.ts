// dto/create-report.dto.ts
import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({
    description: 'Дата начала отчета',
    type: String,
    format: 'date',
  })
  @IsDateString()
  date_start: Date;

  @ApiProperty({
    description: 'Дата окончания отчета',
    type: String,
    format: 'date',
  })
  @IsDateString()
  date_end: Date;
}
