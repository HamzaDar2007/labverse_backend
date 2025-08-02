import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketReply } from './entities/ticket-reply.entity';
import { CreateTicketReplyDto } from './dto/create-ticket-reply.dto';
import { UpdateTicketReplyDto } from './dto/update-ticket-reply.dto';
import { Ticket } from '../tickets/entities/ticket.entity';
import { User } from 'src/modules/users/entities/user.entity'; 

@Injectable()
export class TicketRepliesService {
  constructor(
    @InjectRepository(TicketReply)
    private replyRepo: Repository<TicketReply>,
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateTicketReplyDto) {
    const ticket = await this.ticketRepo.findOne({ where: { id: dto.ticket_id } });
    if (!ticket) throw new NotFoundException('Ticket not found');

    const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
    if (!user) throw new NotFoundException('User not found');

    const reply = this.replyRepo.create({ ...dto, ticket, user });
    return this.replyRepo.save(reply);
  }

  findAll() {
    return this.replyRepo.find({ relations: ['ticket', 'user'] });
  }

  async findOne(id: string) {
    const reply = await this.replyRepo.findOne({ where: { id }, relations: ['ticket', 'user'] });
    if (!reply) throw new NotFoundException('Reply not found');
    return reply;
  }

  async update(id: string, dto: UpdateTicketReplyDto) {
    const reply = await this.findOne(id);

    if (dto.message) {
      reply.message = dto.message;
    }

    return this.replyRepo.save(reply);
  }

  async remove(id: string) {
    const reply = await this.findOne(id);
    return this.replyRepo.remove(reply);
  }
}
