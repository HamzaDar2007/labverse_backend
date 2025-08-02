import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { TicketRepliesService } from './replies.service'; 
import { CreateTicketReplyDto } from './dto/create-ticket-reply.dto';
import { UpdateTicketReplyDto } from './dto/update-ticket-reply.dto';

@Controller('ticket-replies')
export class TicketRepliesController {
  constructor(private readonly service: TicketRepliesService) {}

  @Post()
  create(@Body() dto: CreateTicketReplyDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTicketReplyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
