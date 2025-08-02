import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Conversation } from '../conversations/entities/conversation.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private repo: Repository<Message>,

    @InjectRepository(Conversation)
    private convRepo: Repository<Conversation>,
  ) {}

  async create(dto: CreateMessageDto) {
    const conversation = await this.convRepo.findOne({ where: { id: dto.conversation_id } });
    if (!conversation) throw new NotFoundException('Conversation not found');

    const message = this.repo.create({ ...dto, conversation });
    return this.repo.save(message);
  }

  findAll() {
    return this.repo.find({ relations: ['conversation', 'sender'] });
  }

  async findOne(id: string) {
    const message = await this.repo.findOne({ where: { id }, relations: ['conversation', 'sender'] });
    if (!message) throw new NotFoundException('Message not found');
    return message;
  }

  async update(id: string, dto: UpdateMessageDto) {
    const msg = await this.findOne(id);
    Object.assign(msg, dto);
    return this.repo.save(msg);
  }

  async remove(id: string) {
    const msg = await this.findOne(id);
    return this.repo.remove(msg);
  }
}
