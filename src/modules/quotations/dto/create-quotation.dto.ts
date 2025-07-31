import { IsUUID, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateQuotationDto {
  @IsUUID()
  client_id: string;

  @IsUUID()
  @IsOptional()
  development_plan_id?: string;

  @IsOptional()
  @IsString()
  custom_note?: string;

  @IsNumber()
  quotation_total: number;
}