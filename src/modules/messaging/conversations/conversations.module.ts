import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { Conversation } from './entities/conversation.entity';
import { UsersModule } from '../../users/users.module'; // ✅ Import this
import { User } from '../../users/entities/user.entity';  // ✅ Needed for repository


@Module({
  imports: [TypeOrmModule.forFeature([Conversation, User, UsersModule ])],
  controllers: [ConversationsController],
  providers: [ConversationsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
