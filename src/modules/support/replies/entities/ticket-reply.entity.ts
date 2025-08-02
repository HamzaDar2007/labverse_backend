// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   JoinColumn,
//   CreateDateColumn,
// } from 'typeorm';
// import { Ticket } from '../../tickets/entities/ticket.entity';
// import { User } from 'src/modules/users/entities/user.entity'; 

// @Entity('ticket_replies')
// export class TicketReply {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => Ticket, (ticket) => ticket.replies, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'ticket_id' })
//   ticket: Ticket;

//   @ManyToOne(() => User, { onDelete: 'SET NULL' })
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//   @Column('text')
//   message: string;
  
//   @CreateDateColumn({ type: 'timestamp' })
//   created_at: Date;
// }
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('ticket_replies')
export class TicketReply {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.replies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('text')
  message: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
