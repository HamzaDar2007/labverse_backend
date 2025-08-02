import { IsUUID, IsString } from 'class-validator';

export class CreateTicketReplyDto {
  @IsUUID()
  ticket_id: string;

  @IsUUID()
  user_id: string;

  @IsString()
  message: string;
}
