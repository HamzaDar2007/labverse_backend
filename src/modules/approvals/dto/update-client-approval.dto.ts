// dto/update-client-approval.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateClientApprovalDto } from './create-client-approval.dto';
import { IsIn, IsOptional, IsString } from 'class-validator';
export class UpdateClientApprovalDto extends PartialType(CreateClientApprovalDto) {
  @IsOptional()
  @IsIn(['pending', 'approved', 'rejected'])
  status?: 'pending' | 'approved' | 'rejected';

  @IsOptional()
  @IsString()
  client_response?: string;
}
