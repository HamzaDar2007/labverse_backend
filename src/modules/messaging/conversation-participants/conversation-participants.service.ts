import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationParticipant } from './entities/conversation-participant.entity';
import { CreateConversationParticipantDto } from './dto/create-conversation-participant.dto';
import { UpdateConversationParticipantDto } from './dto/update-conversation-participant.dto';
import { Conversation } from '../conversations/entities/conversation.entity';
import { User } from 'src/modules/users/entities/user.entity'; 

@Injectable()
export class ConversationParticipantsService {
  constructor(
    @InjectRepository(ConversationParticipant)
    private repo: Repository<ConversationParticipant>,
    @InjectRepository(Conversation)
    private convRepo: Repository<Conversation>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateConversationParticipantDto) {
    const conversation = await this.convRepo.findOne({ where: { id: dto.conversation_id } });
    if (!conversation) throw new NotFoundException('Conversation not found');

    const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
    if (!user) throw new NotFoundException('User not found');

    const participant = this.repo.create({ conversation, user });
    return this.repo.save(participant);
  }

  findAll() {
    return this.repo.find({ relations: ['conversation', 'user'] });
  }

  async findOne(id: string) {
    const participant = await this.repo.findOne({ where: { id }, relations: ['conversation', 'user'] });
    if (!participant) throw new NotFoundException('Participant not found');
    return participant;
  }

  async update(id: string, dto: UpdateConversationParticipantDto) {
    const participant = await this.findOne(id);

    if (dto.conversation_id) {
      const conversation = await this.convRepo.findOne({ where: { id: dto.conversation_id } });
      if (!conversation) throw new NotFoundException('Conversation not found');
      participant.conversation = conversation;
    }

    if (dto.user_id) {
      const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
      if (!user) throw new NotFoundException('User not found');
      participant.user = user;
    }

    return this.repo.save(participant);
  }

  async remove(id: string) {
    const participant = await this.findOne(id);
    return this.repo.remove(participant);
  }
}
