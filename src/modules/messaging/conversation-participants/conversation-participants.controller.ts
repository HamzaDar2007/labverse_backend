import { Controller, Post, Get, Param, Delete, Body, Patch } from '@nestjs/common';
import { ConversationParticipantsService } from './conversation-participants.service';
import { CreateConversationParticipantDto } from './dto/create-conversation-participant.dto';
import { UpdateConversationParticipantDto } from './dto/update-conversation-participant.dto';

@Controller('conversation-participants')
export class ConversationParticipantsController {
  constructor(private readonly service: ConversationParticipantsService) {}

  @Post()
  create(@Body() dto: CreateConversationParticipantDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateConversationParticipantDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
