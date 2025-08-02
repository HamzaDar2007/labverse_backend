// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
// import { EmployeeProfile } from './../../../employees/entities/employee_profile.entity'; 
// import { TicketReply } from '../../replies/entities/ticket-reply.entity';


// @Entity('tickets')
// export class Ticket {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   subject: string;

//   @Column('text')
//   description: string;

//   @Column({ default: 'open' })
//   status: 'open' | 'in_progress' | 'resolved' | 'closed';

//   @Column({ nullable: true })
//   priority?: 'low' | 'medium' | 'high';

//   @ManyToOne(() => EmployeeProfile, { nullable: true })
//   @JoinColumn({ name: 'assigned_to' })
//   assigned_to: EmployeeProfile;

//   @Column({ type: 'uuid' })
//   submitted_by: string;

//   @CreateDateColumn()
//   created_at: Date;

//   @OneToMany(() => TicketReply, (reply) => reply.ticket, { cascade: true })
//   replies: TicketReply[];

// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { EmployeeProfile } from '../../../employees/entities/employee_profile.entity';
import { TicketReply } from '../../replies/entities/ticket-reply.entity';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: ['open', 'in_progress', 'resolved', 'closed'], default: 'open' })
  status: TicketStatus;

  @Column({ type: 'enum', enum: ['low', 'medium', 'high'], nullable: true })
  priority?: TicketPriority;

  @ManyToOne(() => EmployeeProfile, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assigned_to' })
  assigned_to: EmployeeProfile;

  @Column({ type: 'uuid' })
  submitted_by: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => TicketReply, (reply) => reply.ticket, { cascade: true })
  replies: TicketReply[];
}
