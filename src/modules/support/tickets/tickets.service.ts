import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
  ) {}

  create(dto: CreateTicketDto) {
    const ticket = this.ticketRepo.create(dto);
    return this.ticketRepo.save(ticket);
  }

  findAll() {
    return this.ticketRepo.find({ relations: ['assigned_to'] });
  }

  async findOne(id: string) {
    const ticket = await this.ticketRepo.findOne({ where: { id }, relations: ['assigned_to'] });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

async update(id: string, dto: UpdateTicketDto) {
  await this.findOne(id);

  const { assigned_to, ...rest } = dto;

  await this.ticketRepo.update(id, {
    ...rest,
    assigned_to: assigned_to ? { id: assigned_to } : undefined, // convert string to relation
  });

  return this.findOne(id);
}
  async remove(id: string) {
    const ticket = await this.findOne(id);
    return this.ticketRepo.remove(ticket);
  }
}
