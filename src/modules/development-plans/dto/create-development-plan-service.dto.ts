import { IsUUID } from 'class-validator';

export class CreateDevelopmentPlanServiceDto {
  @IsUUID()
  development_plan_id: string;

  @IsUUID()
  service_id: string;
}