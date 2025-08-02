
// // participants/entities/participant.entity.ts
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   ManyToOne,
//   JoinColumn,
//   Column,
//   CreateDateColumn,
//   UpdateDateColumn,
//   Unique,
// } from 'typeorm';
// import { User } from '../../../users/entities/user.entity';
// import { Conversation } from '../../conversations/entities/conversation.entity';
// import { ParticipantRole } from '../dto/create-participant.dto';

// @Entity('conversation_participants')
// @Unique(['conversation', 'user'])
// export class ConversationParticipant {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => Conversation, (conversation) => conversation.participants, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'conversation_id' })
//   conversation: Conversation;

//   @ManyToOne(() => User, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//   @Column({ type: 'enum', enum: ParticipantRole })
//   role: ParticipantRole;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;
// }


// src/modules/messaging/conversations/entities/conversation.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  created_by: User;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @OneToMany(() => ConversationParticipant, (participant) => participant.conversation)
  participants: ConversationParticipant[];
}
