import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRepliesController } from './replies.controller'; 
import { TicketRepliesService } from './replies.service'; 
import { TicketReply } from './entities/ticket-reply.entity';
import { Ticket } from '../tickets/entities/ticket.entity';
import { User } from 'src/modules/users/entities/user.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([TicketReply, Ticket, User])],
  controllers: [TicketRepliesController],
  providers: [TicketRepliesService],
})
export class TicketRepliesModule {}
