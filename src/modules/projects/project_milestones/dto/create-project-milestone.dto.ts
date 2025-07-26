import { IsString, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateProjectMilestoneDto {
  @IsUUID()
  project_id: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  due_date?: Date;
}
