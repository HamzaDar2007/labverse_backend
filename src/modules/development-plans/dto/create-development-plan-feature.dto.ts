// create-development-plan-feature.dto.ts
import { IsUUID } from 'class-validator';

export class CreateDevelopmentPlanFeatureDto {
  @IsUUID()
  development_plan_id: string;

  @IsUUID()
  feature_id: string;
}
