// ✅ create-development-plan-technology.dto.ts
import { IsUUID } from 'class-validator';

export class CreateDevelopmentPlanTechnologyDto {
  @IsUUID()
  development_plan_id: string;

  @IsUUID()
  technology_id: string;
}
