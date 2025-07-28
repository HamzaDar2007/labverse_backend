import { IsUUID, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateTimeEntryDto {
  @IsUUID()
  project_id: string;

  @IsUUID()
  task_id: string;

  @IsUUID()
  employee_id: string;

  @IsDateString()
  start_time: string;

  @IsDateString()
  end_time: string;

  @IsNumber()
  duration_hours: number;

  @IsOptional()
  @IsNumber()
  billed_amount?: number;
}
