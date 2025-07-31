import { IsUUID, IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  invoice_id: string;

  @IsNumber()
  amount_paid: number;

  @IsString()
  payment_method: string;

  @IsOptional()
  @IsString()
  payment_reference?: string;

  @IsDateString()
  payment_date: string;

  @IsOptional()
  @IsString()
  note?: string;
}