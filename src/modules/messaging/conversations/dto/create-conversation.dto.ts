// messaging/conversations/dto/create-conversation.dto.ts
import { IsString, IsUUID } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  topic: string;

  @IsUUID()
  created_by: string;
}