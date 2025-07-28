import { IsNotEmpty, IsOptional, IsUUID, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  priority?: string;

  @IsOptional()
  @IsUUID()
  assigned_to_id?: string;

  @IsNotEmpty()
  @IsUUID()
  project_id: string;

  @IsOptional()
  @IsUUID()
  milestone_id?: string;

  @IsUUID()
  @IsOptional()
  assignee_id?: string;  // ✅ Add this line to allow assignee_id
}

