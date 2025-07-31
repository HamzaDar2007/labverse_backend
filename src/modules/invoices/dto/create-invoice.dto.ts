import { IsUUID, IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateInvoiceDto {
  @IsUUID()
  client_id: string;

  @IsUUID()
  @IsOptional()
  quotation_id?: string;

  @IsString()
  invoice_number: string;

  @IsDateString()
  issue_date: string;

  @IsDateString()
  due_date: string;

  @IsString()
  status: 'unpaid' | 'paid' | 'overdue' | 'partial';

  @IsNumber()
  total_amount: number;

  @IsOptional()
  @IsNumber()
  amount_paid?: number;
}