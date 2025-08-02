import { IsUUID, IsEnum } from 'class-validator';

export enum ParticipantRole {
  USER = 'user',
  ADMIN = 'admin',
}

export class CreateParticipantDto {
  @IsUUID()
  conversation_id: string;

  @IsUUID()
  user_id: string;

  @IsEnum(ParticipantRole)
  role: ParticipantRole;
}
