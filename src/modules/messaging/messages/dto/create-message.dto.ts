import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsUUID()
  conversation_id: string;

  @IsUUID()
  sender_id: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
