// // participants/participants.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { ConversationParticipant } from './entities/participant.entity';
// import { CreateParticipantDto } from './dto/create-participant.dto';
// import { UpdateParticipantDto } from './dto/update-participant.dto';
// import { Conversation } from '../conversations/entities/conversation.entity';
// import { User } from '../../users/entities/user.entity';

// @Injectable()
// export class ParticipantsService {
//   constructor(
//     @InjectRepository(ConversationParticipant)
//     private readonly participantRepo: Repository<ConversationParticipant>,
//     @InjectRepository(Conversation)
//     private readonly conversationRepo: Repository<Conversation>,
//     @InjectRepository(User)
//     private readonly userRepo: Repository<User>,
//   ) {}

//   async create(dto: CreateParticipantDto) {
//     const conversation = await this.conversationRepo.findOne({ where: { id: dto.conversation_id } });
//     if (!conversation) throw new NotFoundException('Conversation not found');

//     const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
//     if (!user) throw new NotFoundException('User not found');

//     const participant = this.participantRepo.create({ ...dto, conversation, user });
//     return this.participantRepo.save(participant);
//   }

//   findAll() {
//     return this.participantRepo.find({ relations: ['conversation', 'user'] });
//   }

//   async findOne(id: string) {
//     const participant = await this.participantRepo.findOne({ where: { id }, relations: ['conversation', 'user'] });
//     if (!participant) throw new NotFoundException('Participant not found');
//     return participant;
//   }

//   async update(id: string, dto: UpdateParticipantDto) {
//     const participant = await this.findOne(id);
//     Object.assign(participant, dto);
//     return this.participantRepo.save(participant);
//   }

//   async remove(id: string) {
//     const participant = await this.findOne(id);
//     return this.participantRepo.remove(participant);
//   }
// }

// src/modules/messaging/conversations/conversations.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/participant.entity'; 
import { CreateConversationDto } from '../conversations/dto/create-conversation.dto'; 
import { UpdateConversationDto } from '../conversations/dto/update-conversation.dto';
import { User } from 'src/modules/users/entities/user.entity'; 

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly repo: Repository<Conversation>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateConversationDto) {
    const { created_by, ...rest } = dto;

    const user = await this.userRepo.findOne({ where: { id: created_by } });
    if (!user) throw new NotFoundException('Creator not found');

    const conversation = this.repo.create({
      ...rest,
      created_by: user,
    });

    return this.repo.save(conversation);
  }

  findAll() {
    return this.repo.find({ relations: ['created_by', 'participants'] });
  }

  async findOne(id: string) {
    const convo = await this.repo.find({
      where: { id },
      relations: ['created_by', 'participants'],
    });

    if (!convo?.[0]) throw new NotFoundException('Conversation not found');
    return convo[0];
  }

  async update(id: string, dto: UpdateConversationDto) {
    const convo = await this.findOne(id);
    Object.assign(convo, dto);
    return this.repo.save(convo);
  }

  async remove(id: string) {
    const convo = await this.findOne(id);
    return this.repo.remove(convo);
  }
}
