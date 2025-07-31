import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateDevelopmentPlanDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  estimated_duration?: string;

  @IsNumber()
  base_price: number;
}