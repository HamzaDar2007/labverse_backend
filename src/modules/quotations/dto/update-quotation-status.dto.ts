// ✅ update-quotation-status.dto.ts
import { IsUUID, IsString } from 'class-validator';

export class UpdateQuotationStatusDto {
  @IsUUID()
  quotation_id: string;

  @IsString()
  status: 'sent' | 'accepted' | 'rejected';
}
