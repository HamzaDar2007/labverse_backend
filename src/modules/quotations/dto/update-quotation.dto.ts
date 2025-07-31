import { IsUUID, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateQuotationDto {
  @IsUUID()
  @IsOptional()
  client_id?: string;

  @IsUUID()
  @IsOptional()
  development_plan_id?: string;

  @IsOptional()
  @IsString()
  custom_note?: string;

  @IsOptional()
  @IsNumber()
  quotation_total?: number;
}
