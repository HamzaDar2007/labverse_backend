import { IsUUID, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateInvoiceItemDto {
  @IsUUID()
  invoice_id: string;

  @IsUUID()
  @IsOptional()
  service_id?: string;

  @IsOptional()
  @IsString()
  custom_title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  unit_price: number;

  @IsNumber()
  subtotal: number;
}