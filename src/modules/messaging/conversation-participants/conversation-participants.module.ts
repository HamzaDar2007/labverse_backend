import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationParticipantsController } from './conversation-participants.controller';
import { ConversationParticipantsService } from './conversation-participants.service';
import { ConversationParticipant } from './entities/conversation-participant.entity';
import { Conversation } from '../conversations/entities/conversation.entity';
import { User } from 'src/modules/users/entities/user.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([ConversationParticipant, Conversation, User])],
  controllers: [ConversationParticipantsController],
  providers: [ConversationParticipantsService],
})
export class ConversationParticipantsModule {}
