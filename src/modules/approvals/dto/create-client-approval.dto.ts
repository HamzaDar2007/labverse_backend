// dto/create-client-approval.dto.ts
import { IsUUID, IsString, IsIn } from 'class-validator';

export class CreateClientApprovalDto {
  @IsUUID()
  client_id: string;

  @IsString()
  request_title: string;

  @IsString()
  request_description: string;
}
