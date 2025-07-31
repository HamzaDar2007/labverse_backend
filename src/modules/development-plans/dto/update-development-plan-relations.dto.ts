import { IsUUID, IsArray } from 'class-validator';

export class UpdateDevelopmentPlanRelationsDto {
  @IsUUID()
  development_plan_id: string;

  @IsArray()
  feature_ids: string[];

  @IsArray()
  service_ids: string[];

  @IsArray()
  technology_ids: string[];
}