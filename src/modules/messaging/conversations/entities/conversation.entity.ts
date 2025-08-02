// src/modules/messaging/conversations/entities/conversation.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';
import { ConversationParticipant } from '../../conversation-participants/entities/conversation-participant.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  topic: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  created_by: User;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Message, (message) => message.conversation, { cascade: true })
  messages: Message[];

  @OneToMany(() => ConversationParticipant, (participant) => participant.conversation, { cascade: true })
  participants: ConversationParticipant[];
}
