// participants/participants.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantsController } from './participants.controller';
import { ConversationParticipantsService } from '../conversation-participants/conversation-participants.service'; 
import { ConversationParticipant } from '../conversation-participants/entities/conversation-participant.entity'; 
import { Conversation } from '../conversations/entities/conversation.entity';
import { User } from '../../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConversationParticipant, Conversation, User])],
  controllers: [ParticipantsController],
  providers: [ConversationParticipantsService],
})
export class ParticipantsModule {}
