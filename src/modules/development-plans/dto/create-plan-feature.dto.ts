import { IsString, IsOptional } from 'class-validator';

export class CreatePlanFeatureDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
