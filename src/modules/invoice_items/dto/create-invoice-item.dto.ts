import { IsUUID, IsOptional, IsString, IsInt, IsNumber, Min } from 'class-validator';

export class CreateInvoiceItemDto {
  @IsUUID()
  invoice_id: string;

  @IsOptional()
  @IsUUID()
  service_id?: string;

  @IsOptional()
  @IsString()
  custom_title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  unit_price: number;

  @IsNumber()
  subtotal: number;
}
